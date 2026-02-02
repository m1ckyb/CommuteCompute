/**
 * Device Token Signing Utility
 * HMAC-based signing for webhook URLs to prevent tampering
 *
 * Copyright (c) 2026 Angus Bergman
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createHmac, timingSafeEqual } from 'crypto';

// Use WEBHOOK_SECRET from env, or fall back to a derived key
function getSigningKey() {
  if (process.env.WEBHOOK_SECRET) {
    return process.env.WEBHOOK_SECRET;
  }
  // Fallback: derive from other secrets (not as secure, but better than nothing)
  const base = process.env.ADMIN_PASSWORD || process.env.KV_REST_API_TOKEN || 'default-key';
  return createHmac('sha256', 'cc-fallback').update(base).digest('hex');
}

/**
 * Sign a config token with HMAC-SHA256
 * @param {string} token - The base64url config token
 * @returns {string} - Signature (first 16 chars of HMAC)
 */
export function signToken(token) {
  const key = getSigningKey();
  const hmac = createHmac('sha256', key);
  hmac.update(token);
  return hmac.digest('hex').substring(0, 16);
}

/**
 * Create a signed token URL
 * @param {string} baseUrl - Server base URL
 * @param {string} token - Config token
 * @returns {string} - Full URL with signature
 */
export function createSignedUrl(baseUrl, token) {
  const sig = signToken(token);
  return `${baseUrl}/api/device/${token}?sig=${sig}`;
}

/**
 * Verify a token signature
 * @param {string} token - The config token
 * @param {string} providedSig - The signature from the URL
 * @returns {boolean} - True if valid
 */
export function verifyToken(token, providedSig) {
  if (!providedSig) return false;
  
  const expectedSig = signToken(token);
  
  // Timing-safe comparison
  try {
    const expected = Buffer.from(expectedSig, 'hex');
    const provided = Buffer.from(providedSig, 'hex');
    
    if (expected.length !== provided.length) return false;
    return timingSafeEqual(expected, provided);
  } catch (e) {
    return false;
  }
}

/**
 * Middleware to verify signed device tokens
 * Use in API routes that accept device tokens
 */
export function requireSignedToken(req, res) {
  const token = req.query?.token || req.params?.token;
  const sig = req.query?.sig;
  
  // If WEBHOOK_SECRET is not set, skip verification (backwards compatibility)
  if (!process.env.WEBHOOK_SECRET) {
    return null; // Allow unsigned tokens when signing not configured
  }
  
  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }
  
  if (!verifyToken(token, sig)) {
    console.warn(`[token-signing] Invalid signature for token: ${token.substring(0, 20)}...`);
    return res.status(403).json({ error: 'Invalid token signature' });
  }
  
  return null; // Verification passed
}

export default {
  signToken,
  createSignedUrl,
  verifyToken,
  requireSignedToken
};
