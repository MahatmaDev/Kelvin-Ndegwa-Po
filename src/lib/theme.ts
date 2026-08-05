/**
 * Theme handling.
 *
 * The hard requirement is no flash of the wrong theme. That rules out
 * resolving the theme in a framework component, because React hydrates
 * after first paint — the user would see a white flash before it corrects.
 *
 * So resolution happens in a tiny synchronous script in <head> (see
 * THEME_INIT_SCRIPT), before the browser paints anything. The React toggle
 * island later reads the attribute the script already set.
 */

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export const STORAGE_KEY = 'kn-theme';
export const THEME_ATTRIBUTE = 'data-theme';

/** Runtime guard — `localStorage` can contain anything a user has typed. */
export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}

/**
 * Blocking script injected into <head>, before the stylesheet paints.
 *
 * Deliberately terse and dependency-free: it runs on the critical path, so
 * every byte is on the render-blocking budget. Wrapped in try/catch because
 * localStorage throws outright in Safari private mode, and a theme
 * preference is never worth breaking the page over.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = (stored === 'light' || stored === 'dark')
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', theme);
  } catch (e) {
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', 'dark');
  }
})();
`.trim();

/** Read the theme the init script resolved. Client-only. */
export function getTheme(): Theme {
  const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(attr) ? attr : 'dark';
}

/** Apply and persist a theme. Persistence failure must not block the change. */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Private browsing — the theme still applies for this page view. */
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}
