import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const count = await redis.incr('github_views');
    
    const badgeUrl = `https://img.shields.io/badge/Profile_Views-${count}-38BDF8?style=for-the-badge&logo=eye&logoColor=white&labelColor=0D1117`;
    
    // Tell GitHub and CDNs to cache for max 10 seconds before checking for a new count
    res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10, stale-while-revalidate=59');
    
    return res.redirect(302, badgeUrl);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
