import { readFile } from 'node:fs/promises';
import { encodeGif, writeChanged } from './lib/gif.mjs';
import { projectVisuals, renderProject } from './lib/project-visuals.mjs';
import { renderActivity, validateSnapshot } from './update-activity.mjs';
import { palette as c } from './lib/svg.mjs';

async function save(path, render, width, height, options) {
  const bytes = await encodeGif(render, width, height, options);
  await writeChanged(new URL(`../assets/${path}`, import.meta.url), bytes);
  console.log(`${path}: ${(bytes.length / 1024).toFixed(1)} KB`);
}

function overlay(source, body) { return source.replace('</svg>', body + '</svg>'); }
for (const config of projectVisuals) {
  await save(`projects/${config[0]}.gif`, phase => renderProject(config, phase), 1080, 369);
}

for (const mobile of [false, true]) {
  const suffix = mobile ? '-mobile' : '';
  const hero = await readFile(new URL(`../assets/hero${suffix}.svg`, import.meta.url), 'utf8');
  const width = mobile ? 540 : 1080, height = mobile ? 440 : 370;
  await save(`hero${suffix}.gif`, phase => {
    const x = 50 + (width - 100) * phase;
    const t = phase * Math.PI * 2;
    const cx = (mobile ? 464 : 879) + (mobile ? 28 : 93) * Math.cos(t);
    const cy = (mobile ? 50 : 176) + (mobile ? 22 : 93) * Math.sin(t);
    return overlay(hero, `<path d="M${Math.max(34, x - 80)} ${height - 64}H${x}" stroke="${c.accent}" stroke-width="2" opacity=".8"/>
      <circle cx="${cx}" cy="${cy}" r="8" fill="${c.accent}" opacity=".13"/><circle cx="${cx}" cy="${cy}" r="3" fill="${c.accent}"/>`);
  }, width, height, { frames: 48, delay: 125 });

  const mindset = await readFile(new URL(`../assets/mindset${suffix}.svg`, import.meta.url), 'utf8');
  await save(`mindset${suffix}.gif`, phase => {
    const active = Math.min(5, Math.floor(phase * 6));
    const x = mobile ? 28 + (active % 2) * 254 : 28 + active * 174;
    const y = mobile ? 72 + Math.floor(active / 2) * 170 : 79;
    return overlay(mindset, `<rect x="${x}" y="${y}" width="${mobile ? 230 : 154}" height="${mobile ? 143 : 122}" rx="8" fill="none" stroke="${c.accent}" stroke-width="2"/>
      <circle cx="${x + (mobile ? 210 : 134)}" cy="${y + 25}" r="4" fill="${c.accent}"/>`);
  }, mobile ? 540 : 1080, mobile ? 610 : 284, { frames: 48, delay: 150 });
}

const snapshot = validateSnapshot(JSON.parse(await readFile(new URL('../assets/activity.json', import.meta.url), 'utf8')));
for (const mobile of [false, true]) {
  await save(`activity${mobile ? '-mobile' : ''}.gif`, phase => renderActivity(snapshot, mobile, phase), mobile ? 540 : 1080, mobile ? 604 : 414);
}
