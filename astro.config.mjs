// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Indirizzo e percorso del sito arrivano dall'ambiente di pubblicazione:
// - GitHub Pages (provvisorio): impostati automaticamente dal workflow
// - dominio definitivo: SITE_URL=https://www.mariagraziadezan.it [DA COMPLETARE: dominio]
const site = process.env.SITE_URL || 'https://www.mariagraziadezan.it';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  env: {
    schema: {
      // Interruttore dell'indicizzazione: "true" solo quando il sito è definitivo.
      INDICIZZA: envField.boolean({ context: 'server', access: 'public', default: false }),
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-titoli',
      weights: ['300 700'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Source Sans 3',
      cssVariable: '--font-testo',
      weights: ['400 600'],
      styles: ['normal', 'italic'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
