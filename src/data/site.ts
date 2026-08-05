/**
 * Single source of truth for everything the site says about Kelvin.
 *
 * Rule: no component hard-codes copy. If a string appears on screen and is
 * not prose inside an MDX case study, it comes from here. That keeps the
 * CV, the hero, the meta tags, and the structured data from drifting apart —
 * which is exactly how portfolios end up claiming three different job titles.
 */
import { SITE as BUILD_SITE } from './site.config.mjs';

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  /** Key into the Icon component's registry. */
  readonly icon: 'github' | 'linkedin' | 'email' | 'x' | 'resume';
  /** Shown in the footer and command palette; omitted from the compact hero row. */
  readonly primary: boolean;
}

export interface SkillDomain {
  readonly name: string;
  readonly summary: string;
  readonly skills: readonly string[];
  /** Slug of a project that proves this domain, if one exists. */
  readonly evidence?: string;
}

export interface Service {
  readonly title: string;
  readonly description: string;
  readonly deliverables: readonly string[];
}

export interface Availability {
  readonly open: boolean;
  readonly label: string;
  readonly detail: string;
}

/* ── Identity ───────────────────────────────────────────────────────────── */

export const SITE = {
  ...BUILD_SITE,
  title: 'Kelvin Ndegwa — Real-time Systems & Full-stack Engineer',
  description:
    'I build real-time, event-driven systems where correctness under concurrency actually matters — mobile, web, and the backend underneath both. Nairobi / Nyeri, Kenya.',
} as const;

export const PROFILE = {
  name: 'Kelvin Maina Ndegwa',
  firstName: 'Kelvin',
  /**
   * The role line. Deliberately NOT "full-stack developer" — that phrase is
   * the most crowded self-description in software and communicates nothing.
   */
  role: 'Full-stack Engineer',
  specialism: 'real-time & event-driven systems',

  /** The 15-second pitch. Must survive being read alone, out of context. */
  tagline:
    'I build real-time, event-driven systems where correctness under concurrency actually matters.',

  /** Second line of the hero — makes the abstract claim concrete. */
  subline:
    'Payments that reconcile, inventory that cannot oversell, and mobile clients that stay honest when the network does not.',

  location: 'Nyeri, Kenya',
  timezone: 'EAT (UTC+3)',
  email: 'ndegwak6@gmail.com',

  education: {
    degree: 'BSc, Information Technology',
    institution: 'Dedan Kimathi University of Technology',
    status: 'Final year',
  },

  languages: ['English', 'Kiswahili', 'Kikuyu'],

  resumePath: '/assets/documents/Kelvin-Ndegwa-Resume.pdf',
} as const;

export const AVAILABILITY: Availability = {
  open: true,
  label: 'Open to graduate & junior engineering roles',
  detail: 'Available for full-time roles in Kenya, remote positions, and freelance contracts.',
};

/* ── Navigation ─────────────────────────────────────────────────────────── */

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Services', href: '/#services' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/#contact' },
];

export const SOCIALS: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/MahatmaDev',
    icon: 'github',
    primary: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kelvin-ndegwa',
    icon: 'linkedin',
    primary: true,
  },
  {
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    icon: 'email',
    primary: true,
  },
  {
    label: 'Résumé',
    href: PROFILE.resumePath,
    icon: 'resume',
    primary: false,
  },
];

/* ── Skills ─────────────────────────────────────────────────────────────── */

/**
 * Grouped by domain, with a link to the project that proves each one.
 *
 * Explicitly NOT percentage bars. "JavaScript 80%" is unfalsifiable, means
 * nothing to a reviewer, and signals inexperience. Evidence beats self-scoring.
 */
export const SKILL_DOMAINS: readonly SkillDomain[] = [
  {
    name: 'Backend & APIs',
    summary:
      'Server-authoritative design: the client is never trusted with prices, permissions, or state transitions.',
    skills: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'Express',
      'REST API design',
      'Webhook & callback handling',
      'Idempotency',
      'Rate limiting',
      'JWT & session auth',
    ],
    evidence: 'goodvibes-tickets',
  },
  {
    name: 'Data & Persistence',
    summary:
      'Relational modelling with the constraints in the database, not in application code where they can be bypassed.',
    skills: [
      'PostgreSQL',
      'Supabase',
      'Row-level security',
      'Atomic transactions',
      'Stored procedures',
      'Firebase Firestore',
      'Schema design',
    ],
    evidence: 'goodvibes-tickets',
  },
  {
    name: 'Mobile',
    summary:
      'Native Android and cross-platform React Native — offline-tolerant clients for unreliable networks.',
    skills: [
      'Kotlin',
      'Android SDK',
      'React Native',
      'Expo',
      'expo-router',
      'Firebase Auth',
      'Cloud Functions',
    ],
    evidence: 'chamaos',
  },
  {
    name: 'Frontend',
    summary:
      'Accessible, fast interfaces. Performance treated as a feature with a budget, not an afterthought.',
    skills: [
      'React',
      'Next.js',
      'Astro',
      'TypeScript',
      'Modern CSS',
      'Web Components',
      'WCAG 2.2 AA',
      'Core Web Vitals',
    ],
    evidence: 'portfolio',
  },
  {
    name: 'Payments & Integrations',
    summary: 'Money is the one domain where "mostly correct" is indistinguishable from broken.',
    skills: [
      'M-Pesa STK Push',
      'Daraja API',
      'Payment reconciliation',
      'Async callback verification',
      'Order state machines',
      'QR issuance & validation',
    ],
    evidence: 'goodvibes-tickets',
  },
  {
    name: 'Practice & Tooling',
    summary: 'The parts that decide whether software survives contact with other engineers.',
    skills: [
      'Git',
      'CI/CD',
      'Vercel',
      'Docker basics',
      'Testing',
      'Technical writing',
      'Architecture decision records',
      'Networking & security fundamentals',
    ],
  },
];

/* ── Services (Phase 1 monetization) ────────────────────────────────────── */

export const SERVICES: readonly Service[] = [
  {
    title: 'Payment Integration',
    description:
      'M-Pesa (Daraja / STK Push) and card checkout wired into your product correctly — including the parts most integrations get wrong: async callbacks, idempotency, reconciliation, and refunds.',
    deliverables: [
      'Server-side payment flow',
      'Callback verification & retry handling',
      'Order state machine',
      'Reconciliation dashboard',
    ],
  },
  {
    title: 'Full-stack Web Applications',
    description:
      'Production web apps from schema to interface — authentication, role-based access, admin tooling, and analytics. Built to be handed over, not to be re-hired for.',
    deliverables: [
      'Next.js or Astro frontend',
      'Postgres / Supabase backend',
      'Auth & permissions',
      'Deployment + documentation',
    ],
  },
  {
    title: 'Mobile Applications',
    description:
      'Android (Kotlin) and cross-platform (React Native / Expo) apps that behave correctly on slow and intermittent connections — the normal condition, not the edge case.',
    deliverables: [
      'iOS & Android build',
      'Offline-tolerant sync',
      'Push notifications',
      'Store submission support',
    ],
  },
];

/* ── Structured data ────────────────────────────────────────────────────── */

/** schema.org Person — helps Google surface the right entity for the name. */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    email: `mailto:${PROFILE.email}`,
    jobTitle: PROFILE.role,
    description: SITE.description,
    knowsLanguage: PROFILE.languages,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nyeri',
      addressCountry: 'KE',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PROFILE.education.institution,
    },
    knowsAbout: SKILL_DOMAINS.flatMap((domain) => domain.skills),
    sameAs: SOCIALS.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  };
}
