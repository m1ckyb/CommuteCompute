/**
 * /api/version - Version Information Endpoint
 * 
 * Returns system version, component versions, and build info.
 * Used by the global system footer on all admin panel tabs.
 * 
 * Per DEVELOPMENT-RULES.md Section 7.4: Renderer version must match spec compliance.
 * 
 * Copyright (c) 2026 Angus Bergman
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=300'); // Cache 5 min
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Build date from deployment or current date
  const buildDate = process.env.VERCEL_GIT_COMMIT_SHA 
    ? new Date().toISOString().split('T')[0]
    : '2026-01-31';

  res.json({
    version: 'v3.1.0',
    date: buildDate,
    system: {
      version: '3.1.0',
      name: 'Commute Compute System',
      copyright: '© 2026 Angus Bergman',
      license: 'AGPL-3.0-or-later'
    },
    components: {
      // SmartCommute journey calculation engine (V2.0 - Metro Tunnel Compliant)
      smartcommute: { 
        version: 'v2.0', 
        name: 'SmartCommute Engine',
        description: 'Real-time journey planning with Metro Tunnel compliance',
        metroTunnelCompliant: true,
        effectiveDate: '2026-02-01'
      },
      // CCDash renderer (implements CCDashDesignV12 spec - LOCKED)
      renderer: { 
        version: 'v1.40', 
        name: 'CCDash Renderer',
        spec: 'CCDashDesignV12',
        specLocked: true,
        lockedDate: '2026-02-01',
        description: 'E-ink display rendering with Metro Tunnel support'
      },
      // Setup wizard
      setupWizard: { version: 'v2.0' },
      // LiveDash multi-device endpoint
      livedash: { version: 'v3.0' },
      // Admin panel
      admin: { version: 'v3.1' },
      // Firmware (LOCKED)
      firmware: { 
        version: 'CC-FW-6.1-60s', 
        locked: false,
        description: 'TRMNL OG firmware'
      }
    },
    specs: {
      dashboard: {
        version: 'CCDashDesignV12',
        status: 'LOCKED',
        lockedDate: '2026-02-01'
      }
    },
    environment: process.env.VERCEL ? 'vercel-production' : 'development',
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'local'
  });
}
