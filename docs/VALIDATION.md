# Validação e avaliação crítica

Relatório de validação em 16/10/2026, atualizado após a revisão de movimento solicitada pelo proprietário. Nenhum repositório de projeto referenciado foi modificado.

## Implementação entregue

- Modificado: `README.md`, substituindo banners/contadores e gráficos externos por apresentação editorial em português, com foco em backend.
- Criados: 18 SVGs locais em `assets/` — hero e versão mobile, monograma, seis diagramas de projetos, processo e versão mobile, cinco ícones e atividade em duas versões.
- Criado: `assets/activity.json`, snapshot verificável de commits públicos.
- Acrescentados na revisão: 12 GIFs locais, gerador de movimento, encoder, testes de quadros/temporização e dependência Sharp fixada no lockfile. Os SVGs continuam como alternativas para movimento reduzido.
- Criados: gerador de assets, primitivas SVG compartilhadas, atualização de atividade, testes e validação offline em `scripts/`.
- Criado: `.github/workflows/activity.yml`, atualização semanal/manual com `GITHUB_TOKEN` e action fixada por SHA.
- Criados: `.gitignore`, `docs/DESIGN.md` e este relatório. Arquivos de preview e screenshots ficam em `.preview/`, ignorados pelo Git.

## Conteúdo e links

Quatro destaques: Reembolso360, ApprovalFlowAPI, CHAT-ON e AudienceAPI. Os dois estudos Java inicialmente priorizados continuam com diagramas e descrição técnica própria na seção complementar; Campanhas e Reservas aparecem em tabela breve.

Os oito repositórios apresentados foram acessados por API; os arquivos de evidência vinculados no README foram lidos nos commits fixados. O repositório de perfil é público e usa `main`. Links internos e caminhos de imagens foram validados. LinkedIn tem o endereço fornecido pelo usuário, mas bloqueou a consulta automatizada com status 999; disponibilidade da página não foi confirmada. O endereço `mailto:` foi conferido como texto, sem enviar mensagem ou testar recebimento.

As experiências citadas vêm da missão fornecida. Sem currículo separado, cargos, períodos e responsabilidades específicas não foram acrescentados. Sem fotografia anexada, a referência cromática vem da descrição da missão. Não foram inventadas métricas, senioridade ou certificações.

## Verificações técnicas

| Verificação | Resultado |
| --- | --- |
| `npm test` | 7 testes aprovados: os quatro de atividade, encoder com duração por quadro, movimento real e orçamento dos 12 GIFs, alternativas estáticas nos nove módulos. |
| `node scripts/update-activity.mjs` | Consulta real à API pública executada com sucesso; SHA e datas dos quatro projetos correspondem ao snapshot. |
| `node scripts/update-activity.mjs --offline` | Regeneração a partir do fallback versionado aprovada. |
| `node scripts/build-assets.mjs` | SVGs estáticos regenerados com sucesso. |
| `python scripts/validate.py` | 18 SVGs e 12 GIFs válidos, imagens locais existentes, alt attributes e âncora de navegação corretos. |
| Peso | 32.230 bytes de SVG e 683.362 bytes de GIF após a geração do painel no runner Linux. Nenhum GIF ultrapassa 256 KB; conjunto abaixo do orçamento de 2 MB. |
| Conteúdo SVG | Sem scripts, `foreignObject`, animações, imagens incorporadas ou recursos externos. |
| `git diff --check` | Sem erros de whitespace. |
| Workflow | Checkout/setup-node fixadas por SHA, Node 22, dependência instalada pelo lockfile e cinco paths de commit. [Execução remota aprovada](https://github.com/nevesntc/nevesntc/actions/runs/38971061328), incluindo testes, consulta à API, geração dos GIFs e push do bot. |

O teste real de API encontrou restrição de rede na primeira execução local; a execução autorizada com acesso de rede passou. O snapshot permaneceu íntegro durante a falha. A suíte testa respostas 403, retorno vazio e dados inválidos sem escrever nos assets.

## Validação visual

README renderizado com Marked e folha de estilo local aproximando o Markdown do GitHub; screenshots com Chromium/Chrome via Playwright. O processo não publicou conteúdo e não depende de servidor externo.

| Layout | Imagens | Largura da página | Navegação |
| --- | --- | --- | --- |
| Desktop 1280 px / escuro | Todas carregadas | Sem overflow | Projetos acessível pela âncora |
| Desktop 1280 px / claro | Todas carregadas | Sem overflow | Projetos acessível pela âncora |
| Mobile 390 px / escuro | Todas carregadas; hero compacto selecionado | Sem overflow | Projetos acessível pela âncora |
| Mobile 390 px / claro | Todas carregadas; hero compacto selecionado | Sem overflow | Projetos acessível pela âncora |

A seção complementar foi expandida nos quatro cenários, sem overflow. Os 18 SVGs também foram abertos individualmente no navegador; nenhuma caixa de texto ultrapassou seu `viewBox`. Inspeção visual cobriu hero, módulos de projeto, processo e painel de atividade. O espaçamento da última linha dos cards de processo foi refinado antes da entrega.

Na revisão de movimento, os quatro cenários foram repetidos. Todos os nove módulos selecionam GIFs normalmente e SVGs após emular `prefers-reduced-motion: reduce`; hero, processo e atividade selecionam as variantes compactas no celular. Quadros inicial e intermediário foram decodificados para inspeção. Os testes verificam diferenças reais entre quadros, loop contínuo, duração mínima de 100 ms por quadro e ciclos entre 5 e 8 segundos. Um problema de duração aplicada apenas ao primeiro quadro foi detectado pelo teste do encoder e corrigido antes da entrega.

Depois da publicação, o perfil público foi aberto no Chrome/Playwright. Screenshots do projeto Reembolso360, separados por 1,8 segundo, e do painel de atividade, separados por 2,1 segundos, apresentaram quadros diferentes. O HTML do GitHub preservou os elementos `picture`, `source` e seus media queries. Foram confirmados no renderer real: hero GIF normal, hero SVG com movimento reduzido e hero GIF compacto a 390 px. O workflow manual concluiu com sucesso; o bot atualizou apenas os dois GIFs de atividade por diferenças de rasterização/fontes entre Windows e Linux, sem alterar dados de commits.

Contraste calculado segundo luminância relativa sRGB: o menor contraste dos três tokens de texto sobre os três fundos é **6,85:1** (`#AAB4BE` sobre `#202B34`). Champagne sobre fundo principal: **9,99:1**. Bronze e grid são decorativos; não carregam informação textual essencial. Os microtextos dos diagramas ficam pequenos no celular; a descrição completa permanece em texto Markdown logo abaixo.

Previews locais em `.preview/`: `desktop-dark.png`, `desktop-light.png`, `mobile-dark.png`, `mobile-light.png`; HTMLs `dark.html` e `light.html`; relatório `report.json`. Há também recortes de hero, projetos, processo e atividade.

Esses arquivos são locais e ignorados; não fazem parte da publicação. Não equivalem ao renderer real do GitHub. A conferência no perfil publicado está descrita acima, com screenshots adicionais em `.preview/github-*.png` e relatório `.preview/github-report.json`.

## Avaliação crítica

Notas sobre esta apresentação, não sobre senioridade profissional. Nenhum item recebe 10 porque há limites de conteúdo e validação real.

| Dimensão | Nota / 10 | Justificativa |
| --- | --- | --- |
| Identidade visual | 8,5 | Monograma e composição autorais, paleta coesa, movimento funcional e variantes compactas. A moldura e a tipografia do GitHub continuam fora do controle do README. |
| Clareza profissional | 8,5 | Backend, Java e Spring Boot aparecem na primeira tela. A trajetória perde especificidade sem cargos e períodos documentados. |
| Credibilidade técnica | 8,0 | Oito projetos inspecionados, quatro destaques e links para implementação. Não houve execução das aplicações e há divergências em testes de projetos complementares e do chat. |
| Experiência do visitante | 8,0 | Conteúdo escaneável, links diretos e uma coluna. Ainda exige rolagem considerável no celular; evidências complementares ficam recolhidas. |
| Qualidade de implementação | 8,5 | Assets leves, válidos, acessíveis e independentes de geradores externos; fallback, renderer e Actions verificados. A geração depende de Sharp e fontes do ambiente, o que pode alterar detalhes de rasterização. |

## Publicação e manutenção

Passos, comandos, configuração de Actions, horário e desativação estão em [DESIGN.md](DESIGN.md). O workflow faz commits dos cinco arquivos de atividade; não roda a partir desta cópia local. Se a branch tiver proteção contra commits do bot, manter essa proteção e atualizar os assets pelo fluxo de revisão do repositório.

Revisar projetos e experiências quando houver informação profissional nova. O painel semanal atualiza commits, mas não altera os textos editoriais ou garante que as descrições continuem refletindo futuras mudanças nos projetos.
