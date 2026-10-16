import { frame, text, palette as c } from './svg.mjs';

export const projectVisuals = [
  ['reimbursements', '01 / WORKFLOW & AUDIT', ['Solicitação', 'Aprovação', 'Pagamento'], 'Transições de estado · Histórico de ações'],
  ['approvals', '02 / EVENT PUBLISHING', ['Decisão', 'RabbitMQ', 'Consumer'], 'Salvar → publicar → registrar evento'],
  ['transactions', 'JAVA / TEMPORAL AGGREGATION', ['API REST', 'Memória', 'Estatísticas'], 'Janela de tempo configurável'],
  ['digital-banking', 'JAVA / BUSINESS RULES', ['Controller', 'Serviço', 'JPA / H2'], 'Regras de conta · BigDecimal'],
  ['messaging', '03 / REAL-TIME MESSAGING', ['Socket.IO', 'MySQL', 'Evento'], 'Receber → persistir → emitir'],
  ['analytics', '04 / DATA AGGREGATION', ['Registro', 'EF Core', 'Ranking'], 'Filtrar → agrupar → somar'],
];

export function renderProject(config, phase = null) {
  const [file, label, nodes, detail] = config;
  const progress = phase === null ? 1 : Math.min(1, phase / .8);
  const active = phase === null ? -1 : Math.min(2, Math.floor(progress * 3));
  let body = text(28, 35, label, 17, c.accent, 'letter-spacing="2"');
  body += text(690, 35, 'FLOW / 03', 14, c.muted, 'text-anchor="end" letter-spacing="1"');
  nodes.forEach((node, i) => {
    const x = 28 + i * 232, selected = i === active;
    body += `<rect x="${x}" y="65" width="200" height="81" rx="9" fill="${selected ? '#283039' : c.surface}" stroke="${selected ? c.accent : c.secondary}" stroke-width="${selected ? 2 : 1}"/>`;
    body += text(x + 14, 88, `0${i + 1}`, 14, selected ? c.accent : c.muted);
    body += text(x + 100, 122, node, 25, c.text, 'text-anchor="middle"');
    if (i < active) body += `<path d="m${x + 170} 83 5 5 9-10" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>`;
    if (i < 2) body += `<path d="M${x + 205} 106h22m-6-6 6 6-6 6" fill="none" stroke="${i < active ? c.accent : c.bronze}" stroke-width="1.5"/>`;
  });
  body += `<path d="M128 177H592" stroke="${c.secondary}" stroke-width="2"/>`;
  if (phase !== null) {
    const x = 128 + 464 * progress;
    body += `<path d="M128 177H${x.toFixed(2)}" stroke="${c.bronze}" stroke-width="2"/>`;
    body += `<circle cx="${x.toFixed(2)}" cy="177" r="10" fill="${c.accent}" opacity=".12"/><circle cx="${x.toFixed(2)}" cy="177" r="4" fill="${c.accent}"/>`;
    if (file === 'messaging') {
      const ack = 592 - 464 * Math.max(0, (phase - .5) * 2);
      body += `<circle cx="${ack.toFixed(2)}" cy="185" r="3" fill="${c.muted}" opacity="${phase > .5 ? '.9' : '0'}"/>`;
    }
    if (file === 'analytics') {
      for (let i = 0; i < 4; i++) {
        const height = 4 + (i + 1) * 3 * Math.min(1, progress * 2);
        body += `<rect x="${634 + i * 13}" y="${184 - height}" width="7" height="${height}" rx="1" fill="${c.bronze}"/>`;
      }
    }
  }
  nodes.forEach((_, i) => { body += `<circle cx="${128 + i * 232}" cy="177" r="3" fill="${c.bronze}"/>`; });
  body += text(28, 222, detail, 20, c.muted);
  return frame(720, 246, label, detail + '. ' + nodes.join(' → ') + '. Ilustração do fluxo; não representa execução ao vivo.', body);
}
