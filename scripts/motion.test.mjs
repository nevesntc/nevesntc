import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { encodeGif } from './lib/gif.mjs';
import { frame } from './lib/svg.mjs';
import { projectVisuals } from './lib/project-visuals.mjs';

const files = [
  ...projectVisuals.map(([name]) => `projects/${name}.gif`),
  'hero.gif', 'hero-mobile.gif', 'mindset.gif', 'mindset-mobile.gif', 'activity.gif', 'activity-mobile.gif',
];

test('encoder preserves distinct frames, loop and timing', async () => {
  const bytes = await encodeGif(p => frame(24, 24, 'test', 'test', `<rect width="24" height="24" fill="${p < .5 ? '#D8B68A' : '#151D25'}"/>`), 24, 24, { frames: 4, delay: 125 });
  const metadata = await sharp(bytes, { animated: true }).metadata();
  assert.ok(metadata.pages >= 2);
  assert.equal(metadata.loop, 0);
  assert.ok(metadata.delay.every(d => d >= 100));
});

test('all delivered GIFs contain motion and stay within the asset budget', async () => {
  let total = 0;
  for (const file of files) {
    const path = new URL(`../assets/${file}`, import.meta.url);
    const bytes = await readFile(path);
    const metadata = await sharp(bytes, { animated: true }).metadata();
    const first = await sharp(bytes, { page: 0 }).raw().toBuffer();
    const other = await sharp(bytes, { page: Math.floor(metadata.pages / 2) }).raw().toBuffer();
    assert.equal(metadata.format, 'gif', file);
    assert.ok(metadata.pages > 1, `${file}: no animation`);
    assert.notDeepEqual(first, other, `${file}: identical frames`);
    assert.equal(metadata.loop, 0, file);
    assert.ok(metadata.delay.every(d => d >= 100), `${file}: frame too fast`);
    const duration = metadata.delay.reduce((a,b) => a+b, 0);
    assert.ok(duration >= 5000 && duration <= 8000, `${file}: unexpected duration ${duration}`);
    const size = (await stat(path)).size;
    assert.ok(size < 256 * 1024, `${file}: too large`);
    total += size;
  }
  assert.ok(total < 2 * 1024 * 1024, `GIF total: ${total}`);
});

test('every animated README module has a reduced-motion SVG alternative', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const pictures = [...readme.matchAll(/<picture>([\s\S]*?)<\/picture>/g)];
  assert.equal(pictures.length, 9);
  for (const [, markup] of pictures) {
    assert.match(markup, /prefers-reduced-motion: reduce/);
    assert.match(markup, /srcset="[^"]+\.svg"/);
    assert.match(markup, /src="[^"]+\.gif"/);
  }
});
