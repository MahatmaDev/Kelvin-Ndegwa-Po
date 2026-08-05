import { useCallback, useEffect, useState } from 'react';
import { getTheme, setTheme, STORAGE_KEY, type Theme } from '@lib/theme';

/**
 * Light/dark toggle.
 *
 * Two constraints shape this component:
 *
 * 1. **No hydration mismatch.** The real theme lives in a DOM attribute
 *    written by a blocking head script, which the server render knows
 *    nothing about. So the markup is theme-independent — both icons are
 *    always rendered and CSS decides which is visible via
 *    `:root[data-theme]`. Server HTML and first client render are byte
 *    identical, and the icon is correct even before this island hydrates.
 *
 * 2. **The OS preference stays live.** If the user has never made an
 *    explicit choice, changing the system theme should change the page.
 *    Once they click the toggle, their choice wins until they clear it.
 */
export default function ThemeToggle() {
  /** Null until mounted — keeps the first client render identical to SSR. */
  const [theme, setLocalTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setLocalTheme(getTheme());

    const media = window.matchMedia('(prefers-color-scheme: light)');

    /* Follow the OS only while no explicit preference is stored. */
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next: Theme = event.matches ? 'light' : 'dark';
      setTheme(next);
      setLocalTheme(next);
    };

    /* Keep other tabs in sync. */
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      if (event.newValue === 'light' || event.newValue === 'dark') {
        setTheme(event.newValue);
        setLocalTheme(event.newValue);
      }
    };

    media.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);

    return () => {
      media.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleToggle = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';

    /* Cross-fade the whole document where the browser supports it, and
       where the user has not asked for reduced motion. */
    const canTransition =
      'startViewTransition' in document &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (canTransition) {
      document.startViewTransition(() => {
        setTheme(next);
        setLocalTheme(next);
      });
    } else {
      setTheme(next);
      setLocalTheme(next);
    }
  }, []);

  /* Generic before mount so SSR and hydration agree; specific afterwards. */
  const label =
    theme === null
      ? 'Toggle colour theme'
      : `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={label}
      title={label}
    >
      <svg
        className="theme-toggle__icon theme-toggle__icon--sun"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      <svg
        className="theme-toggle__icon theme-toggle__icon--moon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}
