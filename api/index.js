import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const count = await redis.incr('github_views');
    
    // Generate native modern dark-mode badge SVG
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="138" height="28" viewBox="0 0 138 28">
        <g rx="4">
          <rect fill="#0D1117" width="87" height="28" rx="3"/>
          <rect fill="#38BDF8" x="87" width="51" height="28" rx="3"/>
          <path fill="#0D1117" d="M87 0h4v28h-4z"/>
        </g>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,sans-serif" font-size="11">
          <text x="44.5" y="18.5" fill="#010101" fill-opacity=".3">PROFILE VIEWS</text>
          <text x="44.5" y="17.5" fill="#fff">PROFILE VIEWS</text>
          <text x="111.5" y="18.5" fill="#010101" fill-opacity=".3">${count}</text>
          <text x="111.5" y="17.5" fill="#38BDF8">${count}</text>
        </g>
      </svg>
    `;

    // Hard anti-cache headers so GitHub fetches a fresh count immediately
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(200).send(svg.trim());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
