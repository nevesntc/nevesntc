import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

export async function encodeGif(render, width, height, { frames = 48, delay = 125 } = {}) {
  const pixels = [];
  for (let i = 0; i < frames; i++) {
    pixels.push(await sharp(Buffer.from(render(i / frames)), { density: 144 }).resize(width, height).ensureAlpha().raw().toBuffer());
  }
  return sharp(Buffer.concat(pixels), {
    raw: { width, height: height * frames, channels: 4, pageHeight: height },
    limitInputPixels: false,
  }).gif({ delay: Array(frames).fill(Math.round(delay / 10) * 10), loop: 0, colours: 128, dither: 0, effort: 7, interFrameMaxError: 0 }).toBuffer();
}

export async function writeChanged(url, bytes) {
  try { if ((await readFile(url)).equals(Buffer.from(bytes))) return false; } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await writeFile(url, bytes);
  return true;
}
