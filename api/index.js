import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // Increment the counter safely
    const count = await redis.incr('github_views');
    
    // Modern badge URL
    const badgeUrl = `https://img.shields.io/badge/Profile_Views-${count}-38BDF8?style=for-the-badge&logo=eye&logoColor=white&labelColor=0D1117`;
    
    // Hard anti-cache headers so it never sticks
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Redirect to the badge
    return res.redirect(302, badgeUrl);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
