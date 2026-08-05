/**
 * Formatting helpers.
 *
 * Dates are formatted with an explicit locale and an explicit UTC timezone.
 * Left to the defaults, the build machine's locale decides — which means a
 * date can silently change format, or shift by a day, depending on where the
 * site was built.
 */

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return DATE_FORMAT.format(date);
}

/**
 * Reading time, at 220 words per minute.
 *
 * Deliberately coarse. The number's only job is to tell a reader whether
 * this is a two-minute read or a twenty-minute one; precision beyond that
 * is false.
 */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
