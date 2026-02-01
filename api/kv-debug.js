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
