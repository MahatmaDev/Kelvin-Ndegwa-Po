# kelvinndegwa.dev — portfolio & engineering case studies

The personal site of **Kelvin Maina Ndegwa** — full-stack engineer, Nyeri, Kenya.

It is also, deliberately, a code sample. A hiring engineer who opens DevTools or clones this
repo is an intended reader, so the architecture below is the point rather than an afterthought.

**Live:** https://kelvin-ndegwa-portfolio.vercel.app

---

## What it is

A static Astro site with one server route and one hydrated component.

| Concern       | Choice                               | Why                                                                                    |
| ------------- | ------------------------------------ | -------------------------------------------------------------------------------------- |
| Framework     | Astro 7, static output               | Ship HTML. The recruiter's forty seconds set the performance ceiling.                  |
| Interactivity | One React island (theme toggle)      | Everything else — nav, drawer, project filter — works before hydration.                |
| Content       | MDX + Zod-validated collections      | A frontmatter typo fails the build instead of rendering `undefined` into a case study. |
| Styling       | Plain CSS, two-layer tokens in OKLCH | Theming remaps ~25 semantic declarations, not every stylesheet.                        |
| Server        | One route: `POST /api/contact`       | The only thing on the site that genuinely needs a server.                              |
| Hosting       | Vercel                               | Static assets on the CDN, the contact route as a function.                             |

### Deliberate non-choices

- **No CSS framework.** The whole stylesheet is smaller than the utility class names would be.
- **No `@astrojs/rss`.** The feed is forty lines of string building in `src/pages/rss.xml.ts`. A
  dependency that produces forty lines of XML is a dependency to maintain forever.
- **No `resend` SDK.** `src/pages/api/contact.ts` calls the HTTP API with `fetch`.
- **No skill percentage bars.** Skills are grouped by domain and each links to the case study
  that demonstrates it.

---

## Running it

Requires Node 20+.

```bash
npm install
npm run dev          # http://localhost:4321
```

| Script              | Does                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `npm run dev`       | Dev server with HMR                                                  |
| `npm run build`     | `astro check` then a production build                                |
| `npm run preview`   | Serve the production build                                           |
| `npm run typecheck` | Type + template checking only                                        |
| `npm run images`    | Regenerate `public/og-default.png` and `public/apple-touch-icon.png` |
| `npm run format`    | Prettier over the repo                                               |

### Environment

Only the contact endpoint needs configuration. Copy `.env.example` to `.env`, or set the same
keys in the Vercel project. Without them, every page still builds and renders — the form
returns a 500 and tells the visitor to email directly.

---

## Layout

```
src/
├── components/
│   ├── islands/      React — hydrated. Currently two files, on purpose.
│   ├── layout/       BaseHead, Header, Footer
│   ├── sections/     Home-page sections, one file each
│   └── ui/           Button, Icon, ProjectCard, Callout
├── content/
│   ├── projects/     Case studies (MDX)
│   └── posts/        Writing (MDX)
├── data/
│   ├── site.config.mjs   Values astro.config.mjs needs at build time
│   └── site.ts           Single source of truth for every string on screen
├── layouts/          BaseLayout
├── lib/              theme.ts, format.ts
├── pages/            Routes. `api/contact.ts` is the only non-static one.
└── styles/           tokens → global → prose → islands
```

**The rule for copy:** no component hard-codes a user-visible string. If it appears on screen
and is not prose inside an MDX file, it comes from `src/data/site.ts`. That is what stops the
hero, the meta tags, the structured data and the CV from quietly claiming three different job
titles.

---

## Content

Adding a case study means adding one MDX file to `src/content/projects/`. The schema in
`src/content.config.ts` requires a title, tagline, summary, role, timeline, status, stack,
domains and at least one highlight, and it accepts a list of named trade-offs — each with a
decision, a rationale, and **what it cost**.

That last field is in the schema rather than in a style guide because a portfolio that lists
only wins reads as marketing. Making it structural means every future case study has to answer
it.

Set `draft: true` to keep an entry out of the build entirely.

---

## Accessibility & performance

Targets, not aspirations: WCAG 2.2 AA and Lighthouse 95+ on the production deploy.

- Visible focus indicators everywhere; the skip link works.
- `prefers-reduced-motion` honoured — including the marquee and the drawer animation.
- Mobile navigation is a native `<dialog>`: platform focus trap, inert background, Escape.
- No flash of the wrong theme — resolved by a blocking inline script before first paint.
- Contrast checked in both themes, not only in the dark one that was designed first.

### Known gaps

- No automated tests. The build does type checking and schema validation, which covers a lot
  for a content site, but that is a justification rather than a substitute.
- `SITE.url` still points at a `vercel.app` subdomain.

---

## Licence

MIT for the code. The written content, case studies and images are © Kelvin Maina Ndegwa.
