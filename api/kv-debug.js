/**
 * CommuteCompute System™
 * Smart Transit Display for Australian Public Transport
 *
 * Copyright © 2025-2026 Angus Bergman
 *
 * This file is part of CommuteCompute.
 *
 * CommuteCompute is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CommuteCompute is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CommuteCompute. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Debug endpoint for KV storage
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const start = Date.now();

  try {
    // Check env vars
    const envStatus = {
      KV_REST_API_URL: process.env.KV_REST_API_URL ? 'set' : 'missing',
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? 'set' : 'missing',
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? 'set' : 'missing',
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? 'set' : 'missing',
      REDIS_URL: process.env.REDIS_URL ? 'set' : 'missing'
    };

    // Vercel KV uses Upstash under the hood
    const hasKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
                  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
                  !!process.env.REDIS_URL;

    return res.json({
      success: true,
      duration: Date.now() - start,
      kvConfigured: hasKv,
      env: envStatus
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      duration: Date.now() - start
    });
  }
}
