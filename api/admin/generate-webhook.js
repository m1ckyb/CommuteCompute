/**
 * Generate Webhook URL API - Serverless Version
 * Saves config to KV storage and returns webhook URL pointing to /api/screen
 *
 * Copyright (c) 2026 Angus Bergman
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { setPreferences, setTransitApiKey, setUserState } from '../../src/data/kv-preferences.js';

// SECURITY: Require admin authentication
const adminAuth = (req, res) => {
  const pw = req.headers["x-admin-password"] || req.query?.password;
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({error: "Admin disabled"});
  if (!pw || pw !== process.env.ADMIN_PASSWORD) return res.status(401).json({error: "Unauthorized"});
  return null;
};
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { config } = req.body;

    if (!config) {
      return res.status(400).json({ success: false, error: 'No config provided' });
    }

    // Get base URL from request headers
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    console.log('[generate-webhook] Saving config to KV storage...');

    // Save config to KV storage so /api/screen can read it
    const kvPrefs = {
      addresses: config.addresses || {},
      locations: config.locations || {},
      journey: {
        transitRoute: config.journey?.transitRoute || {},
        arrivalTime: config.journey?.arrivalTime || '09:00',
        coffeeEnabled: config.journey?.coffeeEnabled !== false
      },
      cafe: config.cafe || null,
      apiMode: config.apiMode || 'cached'
    };

    await setPreferences(kvPrefs);

    // Save API key and state separately
    if (config.api?.key) {
      await setTransitApiKey(config.api.key);
    }
    if (config.state) {
      await setUserState(config.state);
    }

    console.log('[generate-webhook] Config saved to KV');

    // Webhook URL points to /api/screen which reads from KV
    // This ensures device output matches the PNG preview exactly
    // NOTE: Do NOT append ?format=bmp - firmware adds it automatically
    const webhookUrl = `${baseUrl}/api/screen`;

    res.json({
      success: true,
      webhookUrl,
      savedToKv: true,
      instructions: [
        '1. Your device will fetch from /api/screen',
        '2. Config is stored in Vercel KV',
        '3. Device output will match the PNG preview exactly'
      ]
    });

  } catch (error) {
    console.error('[generate-webhook] Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
