/**
 * Admin Panel Protection
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export default function handler(req, res) {
  const password = req.headers['x-admin-password'] || req.query?.password;
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    return res.status(503).json({
      error: 'Admin panel disabled',
      message: 'ADMIN_PASSWORD not configured'
    });
  }
  
  if (!password || password !== correctPassword) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  return res.status(200).json({
    status: 'authenticated',
    message: 'Admin access granted'
  });
}
