// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { SITE } from './src/data/site.config.mjs';

/**
 * Astro configuration.
 *
 * Rendering strategy: static by default. Individual routes opt into
 * server rendering with `export const prerender = false` — currently only
 * the contact API. This keeps every content page on the CDN as pure HTML
 * while still allowing real server-side logic where it is genuinely needed.
 */
export default defineConfig({
  site: SITE.url,
  adapter: vercel({
    webAnalytics: { enabled: false },
    maxDuration: 10,
  }),

  integrations: [
    react(),
    mdx(),
    sitemap({
      /* Exclude anything that carries `noindex` — a sitemap that lists a
         page marked noindex is a contradiction Search Console reports. */
      filter: (page) => !page.includes('/api/') && !page.includes('/contact/thanks'),
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: false,
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
