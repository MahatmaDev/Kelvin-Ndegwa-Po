/**
 * RSS feed.
 *
 * Hand-rolled rather than pulling in @astrojs/rss. The feed is forty lines
 * of string building, and a dependency that produces forty lines of XML is
 * a dependency that has to be kept, audited and upgraded forever.
 *
 * Feeds carry summaries, not full content — the post pages are where the
 * syntax highlighting and the callouts live.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, PROFILE } from '@data/site';

/** XML has five characters that cannot appear literally in text. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  const items = posts
    .map((post) => {
      const url = new URL(`/writing/${post.id}/`, SITE.url).href;
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
      <dc:creator>${escapeXml(PROFILE.name)}</dc:creator>
${post.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`Writing — ${SITE.shortName}`)}</title>
    <link>${new URL('/writing/', SITE.url).href}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en-ke</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${new URL('/rss.xml', SITE.url).href}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
