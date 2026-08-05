/**
 * Contact form island.
 *
 * Hydrated with client:visible — it sits at the bottom of the page, so
 * paying for its JavaScript before the user has scrolled to it would be
 * spending the performance budget on something nobody has looked at yet.
 *
 * Progressive enhancement: the form has a real `action` and `method`, so if
 * hydration never happens the browser still POSTs to the same endpoint and
 * the visitor still reaches me. The island only upgrades that to an inline,
 * non-navigating submit.
 */
import { useState, type SyntheticEvent } from 'react';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

/** Mirrors the server-side Zod schema in src/pages/api/contact.ts. */
const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  message: { min: 20, max: 4000 },
} as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ kind: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? 'Something went wrong. Please email me directly.');
      }

      form.reset();
      setStatus({ kind: 'success' });
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Unexpected error.',
      });
    }
  }

  if (status.kind === 'success') {
    return (
      <div className="contact-form__result" role="status">
        <p className="contact-form__result-title">Message sent.</p>
        <p>
          I read everything that arrives here and reply to anything that is not a pitch —
          usually within a day or two.
        </p>
        <button
          type="button"
          className="contact-form__reset"
          onClick={() => setStatus({ kind: 'idle' })}
        >
          Send another
        </button>
      </div>
    );
  }

  const busy = status.kind === 'submitting';

  return (
    <form
      className="contact-form"
      /* Real endpoint + method, so the form works without this island. */
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            minLength={LIMITS.name.min}
            maxLength={LIMITS.name.max}
            disabled={busy}
          />
        </div>

        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={LIMITS.email.max}
            disabled={busy}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-subject">
          Subject <span className="field__optional">optional</span>
        </label>
        <input id="cf-subject" name="subject" type="text" maxLength={140} disabled={busy} />
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          minLength={LIMITS.message.min}
          maxLength={LIMITS.message.max}
          placeholder="What are you building, and what is in the way?"
          disabled={busy}
        />
      </div>

      {/*
        Honeypot. Bots fill every field they find; humans never see this one.
        Hidden via CSS rather than type="hidden", which bots skip.
      */}
      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === 'error' && (
        <p className="contact-form__error" role="alert">
          {status.message}
        </p>
      )}

      <div className="contact-form__actions">
        <button type="submit" className="contact-form__submit" disabled={busy}>
          {busy ? 'Sending…' : 'Send message'}
        </button>
        <p className="contact-form__note">
          Or email me directly — some people prefer that, and it reaches the same inbox.
        </p>
      </div>
    </form>
  );
}
