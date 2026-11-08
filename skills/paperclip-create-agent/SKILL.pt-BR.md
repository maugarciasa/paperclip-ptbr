---
name: paperclip-create-agent
description: >
  Crie novos agentes no Paperclip com contratação consciente de governança. Use quando precisar
  inspecionar opções de configuração de adaptadores, comparar configurações de agentes existentes,
  redigir o prompt/configuração de um novo agente e enviar uma solicitação de contratação.
---

# Habilidade de Criação de Agentes do Paperclip (Paperclip Create Agent Skill)

Use esta habilidade quando for solicitado a contratar ou criar um novo agente.

## Pré-condições

Você precisa de:

- acesso ao conselho (board access), ou
- permissão de agente `can_create_agents=true` em sua empresa

Se você não possuir esta permissão, mantenha a tarefa atual atribuída a você mesmo
e identifique a autoridade de contratação ausente. Um cargo de CEO ou gerente não concede
permissão de contratação automaticamente. Não reatribua a tarefa nem crie uma tarefa de escalonamento para burlar
a negação. Use o fluxo de aprovação aplicável quando disponível; caso contrário, salve uma
interação de entrada humana (human-input) na tarefa atual com `resolverPolicy: "human_only"`
e `continuationPolicy: "wake_assignee"`, deixando-a em `in_review`. Use o
payload completo de entrada humana descrito na habilidade `paperclip`; quando o usuário solicitante
for o responsável pela decisão, direcione-a com o `addresseeUserId` real dele. Uma resposta humana
por si só não concede permissão: revalide a autorização antes de qualquer contratação.

## Fluxo de Trabalho

### Escolha o transporte de API

No **Paperclip Runner**, use as ferramentas anunciadas do Paperclip. Use `get_task_context`
e `list_agents` para contexto de identidade e equipe e, em seguida, `search_api` para descobrir os
endpoints de configuração, modelos de instrução, ícones e `agent-hires` usados abaixo.
Invoque as operações descobertas com `call_api`; o servidor fornece o contexto da empresa e
autenticação. Leia os esquemas retornados antes de redigir a contratação.

Os exemplos de shell abaixo aplicam-se a adaptadores que recebem `PAPERCLIP_API_URL` e
`PAPERCLIP_API_KEY`. O Paperclip Runner não fornece essas variáveis diretamente. Não
procure nos arquivos do workspace por um endereço de servidor ou credenciais para recriar esse caminho.
Se `search_api` / `call_api` estiverem indisponíveis, informe que a contratação exige que o
operador habilite as ferramentas de API do runner para esta empresa. Preserve a contratação proposta
na conversa; não afirme falsamente que um agente foi criado nem substitua a contratação permanente solicitada
por um subagente temporário.

### 1. Confirmar identidade e contexto da empresa

```sh
curl -sS "$PAPERCLIP_API_URL/api/agents/me" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"
```

### 2. Descobrir a configuração de adaptadores para esta instância do Paperclip

```sh
curl -sS "$PAPERCLIP_API_URL/llms/agent-configuration.txt" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"

# Em seguida, o adaptador específico que planeja usar, ex.: claude_local:
curl -sS "$PAPERCLIP_API_URL/llms/agent-configuration/claude_local.txt" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"
```

### 3. Comparar configurações de agentes existentes

```sh
curl -sS "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agent-configurations" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"
```

Observe as convenções de nomenclatura, ícones, linhas de subordinação hierárquica e adaptadores que a empresa já adota.

### 4. Descrever a função (role)

Use um parágrafo curto de função para um novo agente: sua identidade e a responsabilidade
que assume. Os [exemplos de funções](references/agent-instruction-templates.md) são
pontos de partida opcionais; para outras funções, use o
[guia base de funções](references/baseline-role-guide.md).

Instruções específicas da empresa fornecidas pelo solicitante têm precedência. Não
expanda a descrição de uma função em um manual operacional genérico. O harness fornece a
coordenação do Paperclip, descoberta de habilidades e orientação do ciclo de vida da tarefa; as instruções do
repositório e as habilidades instaladas carregam os procedimentos aplicáveis de trabalho. Evite
adicionar diretrizes de heartbeat, contratos de execução, comentários obrigatórios por interação,
rotas fixas de revisores ou catálogos conceituais de domínio nas instruções da contratação.

Mantenha linhas de subordinação em `reportsTo`, capacidades em `capabilities` e habilidades
em `desiredSkills`. Adicione detalhes de instruções apenas para requisitos concretos de função ou empresa
que esses campos, a tarefa, as instruções do repositório ou as habilidades instaladas ainda não expressem.

### 5. Descobrir os ícones de agentes permitidos

```sh
curl -sS "$PAPERCLIP_API_URL/llms/agent-icons.txt" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"
```

### 6. Redigir a configuração do novo contratado

- função (role) / título (title) / nome (name)
- ícone (obrigatório na prática; escolha em `/llms/agent-icons.txt`)
- linha hierárquica (`reportsTo`)
- tipo de adaptador (`adapterType`)
- `desiredSkills` da biblioteca de habilidades da empresa quando este perfil necessitar de habilidades instaladas desde o primeiro dia
- se quaisquer `desiredSkills` ou parâmetros de adaptadores expandirem o acesso ao navegador, sistemas externos, escopo do sistema de arquivos ou manipulação de segredos, justifique cada um no comentário de contratação
- configuração de adaptador e runtime alinhada a este ambiente
- mantenha heartbeats periódicos desativados por padrão; apenas defina `runtimeConfig.heartbeat.enabled=true` com um `intervalSec` quando a função realmente exigir trabalho recorrente agendado ou o usuário solicitar explicitamente
- se a função puder manipular comunicados privados ou divulgações sensíveis, confirme antes se existe um fluxo de trabalho confidencial (habilidade dedicada ou processo manual documentado)
- capacidades (`capabilities`)
- ao fornecer instruções de função a partir da etapa 4, envie-as no nível superior como `instructionsBundle.files["AGENTS.md"]` para adaptadores com gerenciamento de pacote. Caso contrário, use o padrão do servidor. Não defina `adapterConfig.promptTemplate` ou `bootstrapPromptTemplate` para novos agentes.
- vínculo com a issue de origem (`sourceIssueId` ou `sourceIssueIds`) quando esta contratação for originada de uma issue

### 7. Revisar o rascunho com o checklist de qualidade

Antes de enviar, percorra todo o checklist de revisão de rascunhos e corrija qualquer item não aprovado:
`skills/paperclip-create-agent/references/draft-review-checklist.md`

### 8. Enviar solicitação de contratação

```sh
curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agent-hires" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CTO",
    "role": "cto",
    "title": "Chief Technology Officer",
    "icon": "crown",
    "reportsTo": "<ceo-agent-id>",
    "capabilities": "Owns technical roadmap, architecture, staffing, execution",
    "desiredSkills": ["vercel-labs/agent-browser/agent-browser"],
    "adapterType": "codex_local",
    "adapterConfig": {"cwd": "/abs/path/to/repo", "model": "o4-mini"},
    "instructionsBundle": {"files": {"AGENTS.md": "You are the CTO..."}},
    "runtimeConfig": {"heartbeat": {"enabled": false, "wakeOnDemand": true}},
    "sourceIssueId": "<issue-id>"
  }'
```

### 9. Tratar o estado de governança

- se a resposta contiver `approval`, a contratação estará em `pending_approval`
- monitore e discuta no tópico de aprovação
- quando o conselho aprovar, você será acordado com `PAPERCLIP_APPROVAL_ID`; leia as issues vinculadas e encerre/comente o acompanhamento

```sh
curl -sS "$PAPERCLIP_API_URL/api/approvals/<approval-id>" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"

curl -sS -X POST "$PAPERCLIP_API_URL/api/approvals/<approval-id>/comments" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"body":"## Solicitação de contratação de CTO enviada\n\n- Aprovação: [<approval-id>](/approvals/<approval-id>)\n- Agente pendente: [<agent-ref>](/agents/<agent-url-key-or-id>)\n- Issue de origem: [<issue-ref>](/issues/<issue-identifier-or-id>)\n\nPrompt e configuração do adaptador atualizados conforme feedback do conselho."}'
```

Se a aprovação já existir e precisar de vinculação manual à issue:

```sh
curl -sS -X POST "$PAPERCLIP_API_URL/api/issues/<issue-id>/approvals" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"approvalId":"<approval-id>"}'
```

Após a concessão da aprovação, execute este ciclo de acompanhamento:

```sh
curl -sS "$PAPERCLIP_API_URL/api/approvals/$PAPERCLIP_APPROVAL_ID" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"

curl -sS "$PAPERCLIP_API_URL/api/approvals/$PAPERCLIP_APPROVAL_ID/issues" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY"
```

Para cada issue vinculada, tome uma das ações:
- feche-a se a aprovação tiver resolvido a solicitação, ou
- comente em Markdown com links para a aprovação e os próximos passos.

## Referências

- Exemplos opcionais de funções: `skills/paperclip-create-agent/references/agent-instruction-templates.md`
- Modelos individuais de função: `skills/paperclip-create-agent/references/agents/`
- Guia curto de redação de funções: `skills/paperclip-create-agent/references/baseline-role-guide.md`
- Checklist pré-envio de revisão de rascunho: `skills/paperclip-create-agent/references/draft-review-checklist.md`
- Formatos de payload dos endpoints e exemplos completos: `skills/paperclip-create-agent/references/api-reference.md`

## Seleção de harness e runner

Escolha o harness subjacente em `adapterType`, como `codex_local` ou
`claude_local`. Novos agentes Codex usam o Paperclip Runner automaticamente em alvos de
execução suportados. Novos agentes Claude Code usam o Paperclip Runner no Apple Silicon,
Mac Intel, Linux x64 e Linux ARM64 com glibc suportada. Alvos desconhecidos ou não suportados
mantêm o Legacy. Darwin SSH também assume Legacy por padrão; a execução nativa
requer uma escolha explícita de runner e ativos remotos compatíveis. O perfil nativo do Claude é
`provider: acpx`, `acpxAgent: claude`, com o modelo comum `claude-opus-5-5`.
Modelos explícitos e runners salvos existentes permanecem intactos. A resposta salva
pode, portanto, ter `adapterType: paperclip_runner` e um provedor resolvido;
utilize essa configuração retornada para leituras e edições posteriores.

O campo opcional de criação `runner` aceita `auto`, `paperclip` ou `legacy`.
Use `legacy` quando o usuário precisar de configurações de CLI que o runtime nativo não possa atender.
Para o Claude, isso inclui o Chrome, comandos/caminhos de estado personalizados, controles de
processos quentes (warm-process), confinamento e limites de turnos. O Claude nativo usa conexões existentes
por chave de API e assinatura. Seu esforço configurado exige confirmação do provedor. Erros de configuração
e autenticação nunca alteram runners silenciosamente.
Agentes existentes mantêm sua execução salva após edições não relacionadas. Uma contratação
aprovada utiliza a configuração analisada pelo conselho. `inheritRuntimeFrom: caller`
mantém sua herança de runtime e restrições de credenciais existentes.

Equivalentes na CLI: `paperclipai agent create --runner legacy --payload-json ...`
e `paperclipai agent hire --runner legacy --payload-json ...`.
