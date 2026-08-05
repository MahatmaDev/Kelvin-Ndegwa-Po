/**
 * Values needed by `astro.config.mjs` at build time.
 *
 * Kept as plain ESM (not TypeScript) because the Astro config file is
 * evaluated by Node before any TS transform runs. Everything else that
 * describes the site lives in `src/data/site.ts`, which imports from here
 * so the canonical URL is never written down twice.
 *
 * TODO(kelvin): point SITE.url at a custom domain (e.g. kelvinndegwa.dev).
 * A vercel.app subdomain reads as "student project" to a recruiter; a
 * domain you own reads as "engineer". It costs ~$12/year and is the
 * cheapest credibility upgrade available.
 */
export const SITE = {
  url: 'https://kelvin-ndegwa-portfolio.vercel.app',
  name: 'Kelvin Maina Ndegwa',
  shortName: 'Kelvin Ndegwa',
  locale: 'en',
  themeColor: '#0b0d10',
};
