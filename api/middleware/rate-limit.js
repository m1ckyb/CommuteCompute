/**
 * Rate Limiting Middleware
 * Prevents API abuse by limiting requests per IP
 *
 * Copyright (c) 2026 Angus Bergman
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const rateLimits = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute
const ADMIN_MAX_REQUESTS = 10; // Stricter for admin endpoints

/**
 * Rate limit middleware
 * @param {Object} req - Request object
 * @param {Object} res - Response object  
 * @param {Object} options - { maxRequests, windowMs }
 * @returns {Object|null} - Returns response if rate limited, null otherwise
 */
export function rateLimit(req, res, options = {}) {
  const maxRequests = options.maxRequests || MAX_REQUESTS;
  const windowMs = options.windowMs || WINDOW_MS;
  
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
             req.headers['x-real-ip'] || 
             'unknown';
  
  const now = Date.now();
  const key = `${ip}:${req.url?.split('?')[0] || 'default'}`;
  
  let entry = rateLimits.get(key);
  
  if (!entry || now - entry.start > windowMs) {
    entry = { count: 0, start: now };
  }
  
  entry.count++;
  rateLimits.set(key, entry);
  
  // Clean old entries periodically
  if (rateLimits.size > 10000) {
    for (const [k, v] of rateLimits) {
      if (now - v.start > windowMs * 2) rateLimits.delete(k);
    }
  }
  
  if (entry.count > maxRequests) {
    console.warn(`[rate-limit] IP ${ip} exceeded limit (${entry.count}/${maxRequests})`);
    return res.status(429).json({ 
      error: 'Too many requests',
      retryAfter: Math.ceil((entry.start + windowMs - now) / 1000)
    });
  }
  
  return null;
}

/**
 * Stricter rate limit for admin endpoints
 */
export function adminRateLimit(req, res) {
  return rateLimit(req, res, { maxRequests: ADMIN_MAX_REQUESTS });
}

export default rateLimit;
