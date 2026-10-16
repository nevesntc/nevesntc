import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fetchSnapshot, projects, renderActivity, validateSnapshot } from './update-activity.mjs';

const fixture = JSON.parse(await readFile(new URL('../assets/activity.json', import.meta.url), 'utf8'));

test('rejects incomplete, duplicate, or invalid data before rendering', () => {
  for (const edit of [
    d => d.projects.pop(),
    d => { d.projects[1] = d.projects[0]; },
    d => { d.projects[0].sha = 'invalid'; },
    d => { d.projects[0].date = 'invalid'; },
  ]) {
    const d = structuredClone(fixture); edit(d);
    assert.throws(() => validateSnapshot(d));
  }
});

test('uses the public commit SHA and committer date returned by GitHub', async () => {
  const fetched = await fetchSnapshot(async (url, options) => {
    const p = fixture.projects.find(p => url.includes(p.repository + '/commits'));
    assert.ok(options.signal);
    return { ok: true, json: async () => [{ sha: p.sha, commit: { committer: { date: p.date } } }] };
  }, new Date(`${fixture.checkedAt}T12:00:00Z`));
  assert.deepEqual(fetched, fixture);
});

test('API errors and empty repositories reject the entire update', async () => {
  await assert.rejects(fetchSnapshot(async () => ({ ok: false, status: 403 })), /403/);
  await assert.rejects(fetchSnapshot(async () => ({ ok: true, json: async () => [] })), /Invalid commit/);
});

test('both layouts retain every project, date, and short commit reference', () => {
  for (const mobile of [false, true]) {
    const svg = renderActivity(fixture, mobile);
    projects.forEach(([, label]) => assert.ok(svg.includes(label)));
    fixture.projects.forEach(p => {
      assert.ok(svg.includes(p.sha.slice(0, 7)));
      assert.ok(svg.includes(p.date.slice(0, 10).split('-').reverse().join('/')));
    });
  }
});
