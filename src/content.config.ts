/**
 * Content collections.
 *
 * Case studies and posts are MDX on disk, validated by Zod at build time.
 * A typo in frontmatter fails the build rather than rendering `undefined`
 * into a page a hiring manager is reading.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/* Imported from `zod` rather than re-exported from `astro:content`, which is
   deprecated. Both resolve to Zod 4 — this is the same validator, named
   where it actually lives. */
import { z } from 'zod';

/** Reusable shape for the "this is what it actually did" numbers. */
const metric = z.object({
  label: z.string(),
  value: z.string(),
  detail: z.string().optional(),
});

/**
 * A named engineering decision and its cost.
 *
 * Every real system involves trade-offs. Portfolios that list only wins read
 * as marketing; naming what a decision cost you is what reads as senior.
 */
const tradeoff = z.object({
  decision: z.string(),
  rationale: z.string(),
  cost: z.string(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line. Shown on the card and in search results. */
      tagline: z.string(),
      /** 2–3 sentences. Shown on the case-study page and in meta description. */
      summary: z.string(),

      role: z.string(),
      timeline: z.string(),
      status: z.enum(['live', 'in-development', 'archived', 'prototype']),

      /** Ordered most-relevant-first; the first four appear on the card. */
      stack: z.array(z.string()).min(1),
      /** Broad buckets used by the client-side filter island. */
      domains: z.array(z.enum(['backend', 'frontend', 'mobile', 'payments', 'data', 'infra'])),

      highlights: z.array(z.string()).min(1),
      metrics: z.array(metric).default([]),
      tradeoffs: z.array(tradeoff).default([]),

      links: z
        .object({
          repo: z.url().optional(),
          live: z.url().optional(),
          caseStudy: z.url().optional(),
        })
        .default({}),

      cover: image().optional(),
      coverAlt: z.string().optional(),

      /** Flagship work renders large at the top of the work section. */
      featured: z.boolean().default(false),
      /** Lower sorts first. */
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, posts };
