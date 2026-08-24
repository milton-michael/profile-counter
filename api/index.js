import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Increment the counter in your database
  const count = await kv.incr('github_views');
  
  // Modernized dark-mode badge with an eye icon
  const badgeUrl = `https://img.shields.io/badge/Profile_Views-${count}-38BDF8?style=for-the-badge&logo=eye&logoColor=white&labelColor=0D1117`;
  
  // Prevent GitHub from caching the image
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  // Redirect GitHub to the generated badge
  res.redirect(302, badgeUrl);
}
