import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const count = await redis.incr('github_views');
    
    const badgeUrl = `https://img.shields.io/badge/Profile_Views-${count}-38BDF8?style=for-the-badge&logo=eye&logoColor=white&labelColor=0D1117`;
    
    // Force GitHub and CDNs to expire the cache every 2 seconds
    res.setHeader('Cache-Control', 'public, max-age=2, s-maxage=2, stale-while-revalidate=5');
    
    return res.redirect(302, badgeUrl);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
