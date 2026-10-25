// robots.txt generato in base all'interruttore INDICIZZA:
// finché il sito non è definitivo chiede ai motori di ricerca di non indicizzarlo.
import type { APIRoute } from 'astro';
import { INDICIZZA } from 'astro:env/server';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site);
  const testo = INDICIZZA
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(testo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
