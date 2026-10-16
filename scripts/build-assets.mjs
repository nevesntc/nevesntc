import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { frame, text, monogram, palette as c } from './lib/svg.mjs';

const root = fileURLToPath(new URL('../assets/', import.meta.url));
async function save(path, value) {
  await mkdir(new URL(`../assets/${path.split('/').slice(0, -1).join('/')}/`, import.meta.url), { recursive: true });
  await writeFile(`${root}/${path}`, value.replace(/[ \t]+$/gm, ''));
}

function hero(mobile = false) {
  const w = mobile ? 540 : 1080, h = mobile ? 440 : 370;
  const grid = Array.from({ length: 12 }, (_, i) => `<path d="M${i * 100} 0V${h}M0 ${i * 60}H${w}"/>`).join('');
  const artwork = mobile ? '' : `<g transform="translate(825 100)" fill="none">
    <rect x="-46" y="-24" width="200" height="200" rx="4" stroke="${c.secondary}"/>
    <rect x="-22" y="0" width="152" height="152" rx="4" stroke="${c.bronze}"/>
    <path d="M-76 76H184M54-54V206" stroke="${c.secondary}"/>
    ${monogram(10, 26, 90)}
    <circle cx="130" cy="0" r="4" fill="${c.accent}"/>
  </g>`;
  return frame(w, h, 'Bruno Neves / Engineering Signature', 'Software Engineer. Backend Engineering, APIs e Software Architecture.', `
  <defs><radialGradient id="glow"><stop stop-color="${c.bronze}" stop-opacity=".14"/><stop offset="1" stop-color="${c.background}" stop-opacity="0"/></radialGradient></defs>
  <rect width="${w}" height="${h}" rx="16" fill="url(#glow)"/>
  <g stroke="${c.secondary}" stroke-width=".7" opacity=".35">${grid}</g>
  <path d="M${mobile ? 34 : 48} 48H${mobile ? 66 : 80}" stroke="${c.accent}" stroke-width="3"/>
  ${text(mobile ? 82 : 94, 54, 'ENGINEERING SIGNATURE', mobile ? 19 : 15, c.accent, 'letter-spacing="2.5"')}
  ${mobile ? monogram(440, 26, 48) : ''}
  ${text(mobile ? 32 : 46, mobile ? 143 : 158, 'BRUNO NEVES', mobile ? 61 : 84, c.text, 'font-weight="700" letter-spacing="-3"')}
  ${text(mobile ? 34 : 50, mobile ? 198 : 209, 'Software Engineer', mobile ? 32 : 31, c.accent, 'font-weight="400"')}
  ${mobile
    ? text(34, 270, 'Backend Engineering', 25, c.muted) + text(34, 307, 'APIs · Software Architecture', 25, c.muted)
    : text(50, 261, 'Backend Engineering · APIs · Software Architecture', 22, c.muted)}
  ${artwork}
  <path d="M${mobile ? 34 : 50} ${h - 64}H${w - (mobile ? 34 : 50)}" stroke="${c.secondary}"/>
  ${text(mobile ? 34 : 50, h - 30, 'BRUNO NEVES / SOFTWARE ENGINEERING', mobile ? 17 : 13, c.muted, 'letter-spacing="1.6"')}
  ${mobile ? '' : text(1030, h - 30, 'BN — 01', 13, c.accent, 'text-anchor="end" letter-spacing="1.8"')}`);
}

await save('hero.svg', hero());
await save('hero-mobile.svg', hero(true));
await save('monogram.svg', frame(64, 64, 'BN', 'Monograma Bruno Neves.', monogram(7, 7, 50)));

const projects = [
  ['reimbursements', '01 / WORKFLOW & AUDIT', ['Solicitação', 'Aprovação', 'Pagamento'], 'Transições de estado · Histórico de ações'],
  ['approvals', '02 / EVENT PUBLISHING', ['Decisão', 'RabbitMQ', 'Consumer'], 'Salvar → publicar → registrar evento'],
  ['transactions', 'JAVA / TEMPORAL AGGREGATION', ['API REST', 'Memória', 'Estatísticas'], 'Janela de tempo configurável'],
  ['digital-banking', 'JAVA / BUSINESS RULES', ['Controller', 'Serviço', 'JPA / H2'], 'Regras de conta · BigDecimal'],
  ['messaging', '03 / REAL-TIME MESSAGING', ['Socket.IO', 'MySQL', 'Evento'], 'Receber → persistir → emitir'],
  ['analytics', '04 / DATA AGGREGATION', ['Registro', 'EF Core', 'Ranking'], 'Filtrar → agrupar → somar'],
];
for (const [file, label, nodes, detail] of projects) {
  let body = text(28, 35, label, 17, c.accent, 'letter-spacing="2"');
  nodes.forEach((node, i) => {
    const x = 28 + i * 232;
    body += `<rect x="${x}" y="58" width="200" height="53" rx="8" fill="${c.surface}" stroke="${c.secondary}"/>`;
    body += text(x + 100, 93, node, 25, c.text, 'text-anchor="middle"');
    if (i < 2) body += `<path d="M${x + 205} 84h22m-6-6 6 6-6 6" fill="none" stroke="${c.bronze}" stroke-width="1.5"/>`;
  });
  body += text(28, 149, detail, 20, c.muted);
  await save(`projects/${file}.svg`, frame(720, 172, label, detail + '. ' + nodes.join(' → '), body));
}

const stages = [
  ['Problem', 'Entender a necessidade'], ['Design', 'Definir contratos'],
  ['Implementation', 'Implementar regras'], ['Validation', 'Testar comportamento'],
  ['Delivery', 'Automatizar a entrega'], ['Evolution', 'Observar e evoluir'],
];
for (const mobile of [false, true]) {
  const w = mobile ? 540 : 1080, h = mobile ? 610 : 284;
  let body = text(28, 38, 'FROM PROBLEM TO EVOLUTION', mobile ? 21 : 16, c.accent, 'letter-spacing="2"');
  stages.forEach(([name, detail], i) => {
    const x = mobile ? 28 + (i % 2) * 254 : 28 + i * 174;
    const y = mobile ? 72 + Math.floor(i / 2) * 170 : 79;
    const width = mobile ? 230 : 154;
    body += `<rect x="${x}" y="${y}" width="${width}" height="${mobile ? 143 : 122}" rx="8" fill="${c.surface}" stroke="${c.secondary}"/>`;
    body += text(x + 14, y + 30, `0${i + 1}`, 17, c.accent);
    body += text(x + 14, y + 65, name, mobile ? 25 : 18, c.text, 'font-weight="600"');
    const words = detail.split(' ');
    body += text(x + 14, y + 96, words.slice(0, -1).join(' '), mobile ? 22 : 16, c.muted);
    body += text(x + 14, y + (mobile ? 121 : 114), words.at(-1), mobile ? 22 : 16, c.muted);
    if (!mobile && i < 5) body += `<path d="M${x + width + 4} ${y + 61}h12m-4-4 4 4-4 4" fill="none" stroke="${c.bronze}"/>`;
  });
  body += text(28, h - 22, 'Necessidade → decisão → feedback', mobile ? 23 : 17, c.muted);
  await save(`mindset${mobile ? '-mobile' : ''}.svg`, frame(w, h, 'Engineering mindset', stages.map(x => x.join(': ')).join('. '), body));
}

const icons = {
  backend: '<rect x="9" y="7" width="46" height="18" rx="4"/><rect x="9" y="39" width="46" height="18" rx="4"/><path d="M32 25v14M17 16h2m-2 32h2m8-32h18M27 48h18"/>',
  services: '<rect x="7" y="22" width="18" height="22" rx="3"/><rect x="39" y="7" width="18" height="18" rx="3"/><rect x="39" y="39" width="18" height="18" rx="3"/><path d="M25 33h8V16h6M33 33v15h6"/>',
  data: '<ellipse cx="32" cy="14" rx="23" ry="8"/><path d="M9 14v34c0 11 46 11 46 0V14M9 31c0 11 46 11 46 0"/>',
  delivery: '<path d="M11 32h42m-12-12 12 12-12 12M9 10h14M9 54h14M9 10v44"/>',
  code: '<path d="m22 16-16 16 16 16m20-32 16 16-16 16M37 9 27 55"/>',
};
for (const [name, paths] of Object.entries(icons)) {
  await save(`icons/${name}.svg`, frame(64, 64, name, `Ícone de ${name}.`, `<g fill="none" stroke="${c.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`));
}
console.log('Generated 16 static SVG assets.');
