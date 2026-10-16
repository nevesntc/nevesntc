# Bruno Neves / Engineering Signature

Identidade e manutenção do README de perfil. Revisão editorial: 16/10/2026.

## Conceito visual

Uma assinatura editorial de engenharia: nome em escala dominante, monograma BN construído com traços, grid discreto e linhas que sugerem contratos e conexões. O banner tem fundo próprio e funciona nos temas claro e escuro sem depender da cor da página.

| Token | Valor | Uso |
| --- | --- | --- |
| Background | `#0B1015` | Fundo dos SVGs |
| Surface | `#151D25` | Nós e módulos |
| Secondary | `#202B34` | Bordas e grid decorativo |
| Accent | `#D8B68A` | Assinatura, números e destaques |
| Bronze | `#A67C52` | Conectores decorativos |
| Text | `#F4F1EB` | Informação principal |
| Muted | `#AAB4BE` | Informação secundária |

Tipografia: fontes de sistema (`Segoe UI`, Arial e equivalentes), com monoespaçada apenas em referências de commit. Nenhum download de fonte, script ou recurso externo dentro dos SVGs. Textos principais de cada projeto permanecem em Markdown para seleção, busca, leitores de tela e tradução. Ícones de categorias são originais e decorativos, sem fingir ser logos oficiais.

O `<picture>` usa versões compactas abaixo de 600 px para hero, processo de engenharia e atividade. Os diagramas têm uma única linha de três nós e títulos curtos. O conteúdo usa uma coluna; tabelas ficam restritas a comparações breves. Sem cards de duas colunas, contadores, animações, troféus ou badges de terceiros.

## Curadoria e veracidade

Fontes pessoais disponíveis: a missão fornecida pelo usuário e o README anterior. Currículo e fotografia separados não foram anexados. A paleta segue a descrição da fotografia na missão; nenhuma foto ou imagem gerada substitui o avatar.

A missão informa formação concluída, conclusão em 2026, inglês avançado, cidade, tecnologias e passagem pelas organizações. Não informa cargos ou períodos. Esses detalhes foram omitidos, assim como cursos e certificações não documentados. A ordem de organizações no perfil não pretende ser uma cronologia. A MegaHype aparece apenas como experiência de fundação, produto e clientes, conforme a missão.

Foram listados os 72 repositórios públicos disponíveis na consulta. A inspeção de código se concentrou nos seis prioritários da missão e em ApprovalFlowAPI e Reembolso360-Backend; READMEs adicionais de ProdutoAPI e Sistema-de-Mensageria ajudaram na comparação. Não houve auditoria completa dos 72 projetos. Links de evidência no README apontam para commits fixos; links principais apontam para o repositório atual. Não foram modificados projetos referenciados.

| Seleção | Evidência e motivo |
| --- | --- |
| Reembolso360 — principal | Java/Spring Boot, fluxo de aprovação condicionado ao valor, autorização nos endpoints, histórico e PostgreSQL/Flyway. É o recorte mais abrangente de regras e persistência entre os projetos inspecionados. |
| ApprovalFlowAPI — principal | Java/Spring Boot, regras na entidade, publicação/consumo RabbitMQ, Docker Compose e workflow de testes/build. Acrescenta mensageria e entrega automatizada verificáveis. |
| CHAT-ON | Socket.IO, persistência com TypeORM/MySQL e eventos de confirmação. Amplia o escopo para comunicação em tempo real. |
| AudienceAPI | Ranking agregado e filtrado, EF Core/SQLite, camadas e testes. Complementa Java/Node com consulta de dados em C#. |
| Transações e Estatísticas — complementar | Java/Spring Boot, janela temporal, agregações em memória e validação de entrada. Recebe diagrama, síntese técnica e link direto para o serviço. |
| Conta Digital — complementar | Regras de saque/depósito, `BigDecimal`, JPA/H2, transações e testes com Mockito. Recebe diagrama e evidências próprias na seção de estudos Java. |
| Dashboard de Campanha | Evidência secundária de React, Express, PostgreSQL, consultas parametrizadas e validações. |
| Imóveis e Reservas | Evidência secundária de modelagem relacional, CRUD e ciclo de reservas com Flask/SQLAlchemy. |

### Referências de código inspecionado

- [Reembolso360: serviço](https://github.com/nevesntc/Reembolso360-Backend/blob/1d4c73a593cb47d0e734b41550c54d8bf35fd84d/src/main/java/com/reembolso360/service/ReimbursementService.java), controller, SecurityConfig, serviços de pagamento e comprovantes, migration SQL, teste de serviço e `pom.xml` na mesma revisão.
- [ApprovalFlowAPI: serviço](https://github.com/nevesntc/ApprovalFlowAPI/blob/c3235284de43bfadf2623c2efdd23d199a8b24ee/src/main/java/br/com/neves/approvalflowapi/services/SolicitacaoService.java), entidade, publisher/consumer, workflow CI, Compose, teste de serviço e `pom.xml` na mesma revisão.
- [Transações: serviço](https://github.com/nevesntc/API-de-Transacoes-e-Estatisticas/blob/733c97ca85c7bd8ed7bb549b1993822f72462c60/src/main/java/com/neves/service/TransactionService.java), controller, `pom.xml`, Dockerfile e teste de serviço na mesma revisão.
- [Conta Digital: implementação do serviço](https://github.com/nevesntc/Sistema-de-Conta-Digital/blob/059137c76b78c049fe2d25d05a15de39f078fae5/src/main/java/br/com/magalupay/contadigital/domain/service/impl/ContaServiceImpl.java), entidade Conta, teste de serviço, `pom.xml` e configuração H2 na mesma revisão.
- [CHAT-ON: bootstrap e fluxo de envio](https://github.com/nevesntc/CHAT-ON/blob/c624a7d2806a7f977863e9e988c3d24fbe7004e2/src/index.ts), caso de uso de envio, configuração MySQL, serviços, repositório e teste de envio na mesma revisão.
- [AudienceAPI: ranking](https://github.com/nevesntc/AudienceAPI/blob/7e129702d5e75009fb691c50e60aaf9b45f31c4b/src/Infrastructure/Repositories/AudienceRepository.cs), serviço, Program, `.csproj` e teste de serviço na mesma revisão.
- [Campanhas: rotas](https://github.com/nevesntc/Dashboard-de-Campanha/blob/665f44b6afa1be32a4ccfa65c6ef30f1d6bc1c08/server/routes/campaigns.js), testes das rotas e componente React na mesma revisão.
- [Reservas: controller](https://github.com/nevesntc/API-de-Gerenciamento-de-Imoveis-e-Reservas/blob/ae9f635ec8a08e0c8a49708fd1916578c2295083/app/controllers/booking_controller.py), modelo Booking e testes de reservas na mesma revisão.

### Limites técnicos observados

A inspeção é de código, não uma certificação de execução dos projetos. O README diz que existem testes e descreve implementações observadas; não afirma cobertura, testes aprovados, segurança de produção ou escalabilidade.

- Transações: os testes instanciam o serviço sem injetar a janela via Spring. A implementação também retorna extremos de `DoubleSummaryStatistics` no conjunto vazio, enquanto o teste espera zero. Por isso o perfil não afirma que a suíte passa.
- Conta digital: `@Transactional` e verificações de saldo não comprovam proteção contra saques concorrentes; não anunciar consistência bancária de produção.
- CHAT-ON: o fluxo ativo de socket persiste diretamente e emite eventos; a fila inicializada é em memória. O teste de envio espera uma assinatura diferente do caso de uso atual. Não apresentar RabbitMQ, fila durável, entrega garantida ou suíte validada como funcionalidades ativas.
- Reservas: CRUD, confirmação e cancelamento são verificáveis; prevenção de sobreposição de reservas não foi demonstrada e não é anunciada.
- ApprovalFlowAPI: o consumer registra eventos no console. O serviço salva a entidade e depois publica; não afirmar outbox, publicação atômica com o banco ou entrega garantida. A existência do workflow não comprova uma execução de CI bem-sucedida.
- Reembolso360: o código registra ordens e baixa de pagamento; não foi identificada integração com uma instituição financeira para movimentação de dinheiro. A apresentação fala em registro de pagamento. Autorização declarada e testes de serviço não substituem auditoria de segurança.

## Atividade: escolha e manutenção

Foram consideradas as documentações dos projetos [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats), [Activity Graph](https://github.com/ashutosh00710/github-readme-activity-graph) e [Lowlighter Metrics](https://github.com/lowlighter/metrics). O primeiro informa descontinuação e limitações da instância pública; o segundo depende de uma instância para servir o gráfico; o terceiro oferece mais recursos do que esta composição precisa.

Escolha: uma única visualização local com o último commit de quatro repositórios públicos. Sem ranking, contagem de estrelas ou inferência de produtividade. Não substitui o calendário de contribuições nativo. Os commits podem ser de qualquer autor. `assets/activity.json` guarda SHA e data do committer em UTC; SVGs exibem a data em `DD/MM/AAAA`. A data de consulta só muda quando algum commit muda. É deliberadamente possível haver projetos sem atualização recente.

`scripts/update-activity.mjs` consulta quatro endpoints REST, valida todas as respostas antes de escrever e preserva o snapshot quando a consulta falha. Não precisa de pacotes npm. Os dois SVGs e o JSON são versionados; mesmo com Actions indisponível, o último resultado permanece visível.

Workflow: segunda-feira às **07h23 em America/Sao_Paulo** (10h23 UTC), ou execução manual na branch padrão. A execução pode atrasar conforme a fila do GitHub. A única action é checkout, fixada pelo SHA consultado da tag v4. Permissão de escrita de conteúdo apenas no job de atualização; sem PAT. Git adiciona explicitamente somente os três arquivos de atividade e não faz commit se não houver mudanças. Não há trigger de PR nem interpolação de dados da API em comandos shell.

Referências: [GITHUB_TOKEN](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token), [eventos e schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), [REST: commits](https://docs.github.com/en/rest/commits/commits#list-commits).

### Comandos de manutenção

Requer Node.js 22 ou superior. A implementação usa apenas módulos nativos.

```sh
node scripts/build-assets.mjs
node scripts/update-activity.mjs --offline
node --test scripts/activity.test.mjs
python scripts/validate.py
git diff --check
```

Para consultar dados novos: `node scripts/update-activity.mjs`. O token é opcional para acesso público fora de Actions. Não salvar tokens no repositório. Se a API falhar ou limitar requisições, investigar o erro e manter o último snapshot; não substituir por números fictícios.

Editar cores e primitivas em `scripts/lib/svg.mjs`; composição em `scripts/build-assets.mjs`. Regenerar os SVGs após alterações. Para alterar a seleção de atividade, atualizar a lista em `scripts/update-activity.mjs`, o snapshot inicial e os testes. Revalidar fatos quando mudar o texto dos projetos.

Para desativar: Actions → Refresh public engineering activity → Disable workflow, ou remover apenas o bloco `schedule` do YAML para manter execução manual. Os SVGs continuam visíveis. Em repositório público, workflows agendados podem ser desativados pelo GitHub após inatividade; o fallback não depende da execução.

## Publicação

Para publicar alterações nesta identidade, revisar README, assets, scripts e workflow e executar os comandos após autorização do proprietário:

```sh
git add README.md assets scripts docs .github .gitignore
git commit -m "feat: introduce engineering signature profile"
git push origin main
```

Confirmar a branch padrão com `git branch --show-current` antes do push e ajustar `main` se necessário. O repositório público `nevesntc/nevesntc` já atende à convenção de perfil. O workflow só é ativado depois da publicação na branch padrão. A política de Actions precisa permitir escrita de conteúdo e commits diretos nessa branch; se regras de proteção bloquearem o bot, preservar o asset e atualizar manualmente pelo fluxo de revisão existente, sem afrouxar proteções.

Depois da publicação, conferir o README no GitHub em claro/escuro e celular; executar o workflow manualmente uma vez para confirmar as permissões reais. Não há secrets novos nem configuração de serviço de métricas. Resultados de QA local e avaliação crítica estão em [VALIDATION.md](VALIDATION.md).
