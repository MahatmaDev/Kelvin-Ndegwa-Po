/**
 * Contact endpoint.
 *
 * The only server-rendered route on the site — everything else is static
 * HTML on the CDN. Handles both the island's JSON fetch and a plain
 * form-encoded POST from a browser without JavaScript, because the form is
 * built to work either way.
 *
 * Requires two environment variables in Vercel:
 *   RESEND_API_KEY   — https://resend.com/api-keys
 *   CONTACT_TO_EMAIL — where messages land
 * A third, CONTACT_FROM_EMAIL, defaults to Resend's shared onboarding
 * sender, which works immediately but should be swapped for an address on a
 * verified domain before this is anything but a demo.
 */
import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

/* ── Validation ───────────────────────────────────────────────────────────
   Mirrors the client-side limits in ContactForm.tsx. The client copy is a
   convenience; this one is the rule, because the client can be bypassed by
   anyone who opens a terminal. */

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short.').max(80),
  email: z.email('That email address does not look right.').max(160),
  subject: z.string().trim().max(140).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Tell me a little more — 20 characters minimum.')
    .max(4000, 'That is longer than this form accepts. Email me instead.'),
  /** Honeypot. Must be empty; only a bot fills a field it cannot see. */
  company: z.string().max(0).optional().or(z.literal('')),
});

/* ── Rate limiting ────────────────────────────────────────────────────────
   A fixed window in module scope. This is honest about what it is: it
   resets when the serverless instance recycles and is not shared across
   concurrent instances, so it stops a naive script rather than a determined
   one. Anything stronger needs external state (Upstash, Vercel KV), which
   is not worth provisioning for a portfolio contact form. */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/* ── Helpers ──────────────────────────────────────────────────────────────*/

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** Escape before interpolating anything user-supplied into the HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Read the body as JSON or as form encoding, depending on what was sent. */
async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return (await request.json()) as Record<string, unknown>;
  }

  return Object.fromEntries(await request.formData());
}

/* ── Handler ──────────────────────────────────────────────────────────────*/

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('content-type') ?? '').includes('application/json');

  let payload: Record<string, unknown>;
  try {
    payload = await readPayload(request);
  } catch {
    return json({ error: 'Could not read that request.' }, 400);
  }

  const parsed = ContactSchema.safeParse(payload);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return json({ error: first?.message ?? 'Please check the form and try again.' }, 400);
  }

  /* Honeypot filled. Return success so the bot has nothing to learn from
     the difference between a rejection and an acceptance. */
  if (parsed.data.company) {
    return json({ ok: true }, 200);
  }

  if (isRateLimited(clientAddress ?? 'unknown')) {
    return json({ error: 'Too many messages from this address. Try again later.' }, 429);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.');
    return json({ error: 'The form is not configured yet. Please email me directly.' }, 500);
  }

  const { name, email, subject, message } = parsed.data;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: `Portfolio <${from}>`,
      to: [to],
      /* Reply goes to the sender, so replying from the inbox just works. */
      reply_to: email,
      subject: subject ? `Portfolio — ${subject}` : `Portfolio — message from ${name}`,
      html: `
        <h2>${escapeHtml(name)}</h2>
        <p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${subject ? `<p><strong>${escapeHtml(subject)}</strong></p>` : ''}
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
      text: `${name} <${email}>\n${subject ?? ''}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    /* Log the provider's reason; never return it — it can contain account
       detail that is nobody else's business. */
    console.error('[contact] Resend rejected the message:', await response.text());
    return json({ error: 'Could not send that. Please email me directly.' }, 502);
  }

  /* A no-JS browser POSTed a form and is waiting for a page, not JSON. */
  if (!wantsJson) {
    return new Response(null, {
      status: 303,
      headers: { location: '/contact/thanks/' },
    });
  }

  return json({ ok: true }, 200);
};

/** Anything other than POST here is a mistake or a probe. */
export const ALL: APIRoute = () =>
  new Response('Method Not Allowed', {
    status: 405,
    headers: { allow: 'POST' },
  });
