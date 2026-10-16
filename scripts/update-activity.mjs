import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { frame, text, palette as c } from './lib/svg.mjs';

export const projects = [
  ['nevesntc/Reembolso360-Backend', 'Reembolso360', 'Java / Spring Boot'],
  ['nevesntc/ApprovalFlowAPI', 'ApprovalFlowAPI', 'Java / RabbitMQ'],
  ['nevesntc/CHAT-ON', 'CHAT-ON', 'TypeScript / Node.js'],
  ['nevesntc/AudienceAPI', 'AudienceAPI', 'C# / ASP.NET Core'],
];
const snapshotUrl = new URL('../assets/activity.json', import.meta.url);

export function validateSnapshot(data) {
  if (data.schemaVersion !== 1 || !/^\d{4}-\d{2}-\d{2}$/.test(data.checkedAt) ||
      !Number.isFinite(Date.parse(data.checkedAt)) || !Array.isArray(data.projects) ||
      data.projects.length !== projects.length) throw new Error('Invalid activity snapshot.');
  for (const [repository] of projects) {
    const matches = data.projects.filter(p => p.repository === repository);
    if (matches.length !== 1 || !/^[a-f0-9]{40}$/.test(matches[0].sha) ||
        !Number.isFinite(Date.parse(matches[0].date))) throw new Error(`Invalid commit for ${repository}.`);
  }
  return data;
}

export function renderActivity(data, mobile = false) {
  validateSnapshot(data);
  const width = mobile ? 540 : 1080, height = mobile ? 604 : 414;
  let body = text(28, 38, 'PUBLIC CODE / LAST COMMIT', mobile ? 22 : 17, c.accent, 'letter-spacing="2"');
  body += text(28, 75, 'Projetos selecionados', mobile ? 27 : 29, c.text, 'font-weight="600"');
  projects.forEach(([repository, name, stack], i) => {
    const p = data.projects.find(p => p.repository === repository);
    const y = 116 + i * (mobile ? 112 : 64);
    const date = new Date(p.date).toISOString().slice(0, 10).split('-').reverse().join('/');
    body += `<circle cx="34" cy="${y + 4}" r="4" fill="${c.accent}"/>`;
    if (i < 3) body += `<path d="M34 ${y + 11}v${mobile ? 94 : 46}" stroke="${c.secondary}"/>`;
    body += text(52, y + 10, name, mobile ? 26 : 24, c.text, 'font-weight="500"');
    if (mobile) {
      body += text(52, y + 44, stack, 23, c.muted);
      body += text(52, y + 76, date, 23, c.accent);
      body += text(485, y + 76, p.sha.slice(0, 7), 20, c.muted, 'text-anchor="end" font-family="Consolas, monospace"');
    } else {
      body += text(505, y + 10, stack, 21, c.muted);
      body += text(835, y + 10, date, 23, c.accent);
      body += text(1050, y + 10, p.sha.slice(0, 7), 19, c.muted, 'text-anchor="end" font-family="Consolas, monospace"');
    }
  });
  body += `<path d="M28 ${height - 58}H${width - 28}" stroke="${c.secondary}"/>`;
  body += text(28, height - 24, `Consulta: ${data.checkedAt.split('-').reverse().join('/')} · GitHub REST API`, mobile ? 21 : 17, c.muted);
  return frame(width, height, 'Atividade pública nos projetos selecionados',
    data.projects.map(p => `${p.repository}: ${p.date.slice(0, 10)}, commit ${p.sha.slice(0, 7)}`).join('. '), body);
}

export async function fetchSnapshot(fetchFn = fetch, now = new Date()) {
  // Collect and validate every response before touching the versioned fallback.
  const results = await Promise.all(projects.map(async ([repository]) => {
    const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetchFn(`https://api.github.com/repos/${repository}/commits?per_page=1`, {
      headers, signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status} for ${repository}.`);
    const [commit] = await response.json();
    return { repository, sha: commit?.sha, date: commit?.commit?.committer?.date };
  }));
  return validateSnapshot({ schemaVersion: 1, checkedAt: now.toISOString().slice(0, 10), projects: results });
}

async function main() {
  const offline = process.argv.includes('--offline');
  const old = validateSnapshot(JSON.parse(await readFile(snapshotUrl, 'utf8')));
  let data = offline ? old : await fetchSnapshot();
  // No housekeeping commits just to change the consultation date.
  if (!offline && JSON.stringify(old.projects) === JSON.stringify(data.projects)) data = old;
  const desktop = renderActivity(data), mobile = renderActivity(data, true);
  await writeFile(new URL('../assets/activity.svg', import.meta.url), desktop);
  await writeFile(new URL('../assets/activity-mobile.svg', import.meta.url), mobile);
  await writeFile(snapshotUrl, JSON.stringify(data, null, 2) + '\n');
  console.log(offline ? 'Activity rendered from versioned snapshot.' : 'Public activity refreshed.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
