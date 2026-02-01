/**
 * KV test endpoint - tests Redis Cloud connection
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const start = Date.now();
  const logs = [];

  try {
    logs.push(`Start: ${Date.now() - start}ms`);

    const hasRedisUrl = !!process.env.REDIS_URL;
    logs.push(`REDIS_URL set: ${hasRedisUrl} (${Date.now() - start}ms)`);

    if (!hasRedisUrl) {
      return res.json({
        success: true,
        duration: Date.now() - start,
        logs,
        message: 'No REDIS_URL, using memory'
      });
    }

    // Parse URL for logging
    const url = new URL(process.env.REDIS_URL);
    logs.push(`Host: ${url.hostname} (${Date.now() - start}ms)`);

    // Import ioredis
    logs.push(`Loading ioredis (${Date.now() - start}ms)`);
    const Redis = (await import('ioredis')).default;
    logs.push(`ioredis loaded (${Date.now() - start}ms)`);

    // Create client
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      commandTimeout: 5000
    });
    logs.push(`Client created (${Date.now() - start}ms)`);

    // Test SET
    const testKey = 'cc:test:ping';
    const testValue = JSON.stringify({ time: Date.now(), test: true });
    logs.push(`SET starting (${Date.now() - start}ms)`);
    await client.set(testKey, testValue);
    logs.push(`SET done (${Date.now() - start}ms)`);

    // Test GET
    logs.push(`GET starting (${Date.now() - start}ms)`);
    const result = await client.get(testKey);
    logs.push(`GET done: ${result} (${Date.now() - start}ms)`);

    // Close connection
    await client.quit();

    return res.json({
      success: true,
      duration: Date.now() - start,
      logs,
      testResult: result
    });
  } catch (error) {
    logs.push(`Error: ${error.message} (${Date.now() - start}ms)`);
    return res.json({
      success: false,
      duration: Date.now() - start,
      logs,
      error: error.message
    });
  }
}
