/**
 * Admin Authentication Middleware
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export function requireAdminAuth(req, res) {
  const providedPassword = 
    req.headers['x-admin-password'] || 
    req.query?.adminPassword ||
    req.body?.adminPassword;
  
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    return res.status(503).json({ 
      error: 'Admin panel disabled',
      message: 'Set ADMIN_PASSWORD in environment variables'
    });
  }
  
  if (!providedPassword) {
    return res.status(401).json({ 
      error: 'Authentication required'
    });
  }
  
  if (providedPassword !== correctPassword) {
    console.warn(`Failed admin auth from ${req.headers['x-forwarded-for']}`);
    return res.status(403).json({ error: 'Invalid credentials' });
  }
  
  return null;
}

export default requireAdminAuth;
