/**
 * Generates the static images that cannot be authored as SVG in /public:
 * the Open Graph card and the Apple touch icon, both of which must be PNG.
 *
 *   node scripts/generate-images.mjs
 *
 * Committed output, generated input. The PNGs live in /public so the build
 * has no image step, but they are reproducible from this file rather than
 * being binaries someone made in a design tool and cannot regenerate.
 *
 * Uses sharp, which Astro already depends on — no new dependency.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = resolve(ROOT, 'public');

/* Hex equivalents of the OKLCH tokens in src/styles/tokens.css. SVG
   rasterisers do not understand oklch(), so these are duplicated here —
   the one place in the project where a colour is written twice. */
const COLOR = {
  bg: '#0b0e11',
  raised: '#14181c',
  line: '#ffffff14',
  accent: '#3ad4c4',
  text: '#f2f4f6',
  muted: '#9aa4ad',
};

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Consolas', 'JetBrains Mono', 'Courier New', monospace";

/* ── Open Graph card ─────────────────────────────────────────────────────
   1200×630 is the size every platform crops toward. Nothing important sits
   within 80px of an edge, because several of them crop further. */

const ogCard = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="${COLOR.line}" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="18%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${COLOR.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${COLOR.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${COLOR.bg}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${COLOR.accent}"/>

  <!-- Brand mark -->
  <rect x="80" y="72" width="64" height="64" rx="14" fill="${COLOR.accent}"/>
  <text x="112" y="115" font-family="${MONO}" font-size="26" font-weight="700"
        fill="${COLOR.bg}" text-anchor="middle">KN</text>

  <text x="164" y="103" font-family="${FONT}" font-size="26" font-weight="600" fill="${COLOR.text}">
    Kelvin Maina Ndegwa
  </text>
  <text x="164" y="130" font-family="${MONO}" font-size="17" fill="${COLOR.muted}">
    Full-stack Engineer · Nyeri, Kenya
  </text>

  <!-- The thesis. Hand-wrapped: SVG text does not wrap. -->
  <text x="80" y="290" font-family="${FONT}" font-size="60" font-weight="700"
        fill="${COLOR.text}" letter-spacing="-1.5">
    I build real-time,
  </text>
  <text x="80" y="362" font-family="${FONT}" font-size="60" font-weight="700"
        fill="${COLOR.text}" letter-spacing="-1.5">
    event-driven systems
  </text>
  <text x="80" y="434" font-family="${FONT}" font-size="60" font-weight="700"
        fill="${COLOR.accent}" letter-spacing="-1.5">
    that stay correct.
  </text>

  <line x1="80" y1="500" x2="1120" y2="500" stroke="${COLOR.line}" stroke-width="1"/>

  <text x="80" y="546" font-family="${MONO}" font-size="20" fill="${COLOR.muted}">
    TypeScript · Node · PostgreSQL · React Native · Kotlin · M-Pesa
  </text>
</svg>`;

/* ── Apple touch icon ────────────────────────────────────────────────────
   180×180, opaque — iOS composites no transparency and will render an
   alpha channel as black. */

const touchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${COLOR.raised}"/>
  <rect x="10" y="10" width="160" height="160" rx="32" fill="${COLOR.accent}"/>
  <text x="90" y="118" font-family="${MONO}" font-size="72" font-weight="700"
        fill="${COLOR.bg}" text-anchor="middle">KN</text>
</svg>`;

async function render(svg, filename, label) {
  const target = resolve(PUBLIC, filename);
  await mkdir(dirname(target), { recursive: true });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(target, png);
  console.log(`  ✓ ${filename.padEnd(24)} ${(png.length / 1024).toFixed(1)} kB — ${label}`);
}

console.log('Generating static images…');
await render(ogCard, 'og-default.png', 'Open Graph / Twitter card');
await render(touchIcon, 'apple-touch-icon.png', 'iOS home screen icon');
console.log('Done.');
