---
title: Comandos do Plano de Controle (Control-Plane Commands)
summary: Comandos de issues, agentes, aprovações e dashboard
---

Comandos do lado do cliente para gerenciar issues (tarefas), agentes, aprovações e muito mais.

## Comandos de Issues (Tarefas)

```sh
# Listar issues
npx paperclipai issue list [--status todo,in_progress] [--assignee-agent-id <id>] [--match texto]

# Obter detalhes de uma issue
npx paperclipai issue get <id-ou-identificador-da-issue>

# Criar issue
npx paperclipai issue create --title "..." [--description "..."] [--status todo] [--priority high]

# Atualizar issue
npx paperclipai issue update <issue-id> [--status in_progress] [--comment "..."]

# Adicionar comentário
npx paperclipai issue comment <issue-id> --body "..." [--reopen]

# Fazer checkout de tarefa (assumir execução)
npx paperclipai issue checkout <issue-id> --agent-id <agent-id>

# Liberar tarefa (release)
npx paperclipai issue release <issue-id>
```

## Comandos de Empresa (Company Commands)

```sh
npx paperclipai company list
npx paperclipai company get <company-id>
npx paperclipai company current [--company-id <company-id>]

# Exportar para pacote de pastas portátil (grava manifesto + arquivos markdown)
npx paperclipai company export <company-id> --out ./exports/acme --include company,agents

# Pré-visualizar importação (sem gravações / dry-run)
npx paperclipai company import \
  <proprietario>/<repo>/<caminho> \
  --target existing \
  --company-id <company-id> \
  --ref main \
  --collision rename \
  --dry-run

# Aplicar importação
npx paperclipai company import \
  ./exports/acme \
  --target new \
  --new-company-name "Acme Importada" \
  --include company,agents
```

O comando `company import` não está disponível em instâncias gerenciadas em nuvem — o servidor responderá `403` com `code: "cloud_managed"`. A exportação continua disponível.

Com autenticação de agente, utilize `company list` ou `company current` para resolver a empresa no escopo. `company list` tenta primeiro a listagem completa do conselho; se for proibido, ele faz fallback para `--company-id`, `PAPERCLIP_COMPANY_ID`, arquivo de contexto ou `/api/agents/me`, retornando apenas essa empresa do escopo. O comando `company create` exige autenticação de administrador de conselho/instância por ser uma operação de instalação global.

## Comandos de Agentes (Agent Commands)

```sh
npx paperclipai agent list
npx paperclipai agent get <agent-id>
```

## Comandos de Habilidades (Skills Commands)

```sh
# Navegar no catálogo de habilidades fornecidas sem alterar o estado da empresa
npx paperclipai skills browse [--kind bundled|optional] [--category software-development] [--query github]
npx paperclipai skills search "pull request" [--json]

# Inspecionar metadados do catálogo e inventário de arquivos antes da instalação
npx paperclipai skills inspect github-pr-workflow

# Instalar uma habilidade do catálogo na biblioteca de habilidades da empresa
# Isso não anexa a habilidade a nenhum agente automaticamente.
npx paperclipai skills install github-pr-workflow --company-id <company-id>
npx paperclipai skills install github-pr-workflow --as pr-flow --force --company-id <company-id>

# Fontes externas continuam usando import em vez de install do catálogo
npx paperclipai skills import ./skills/minha-habilidade --company-id <company-id>
npx paperclipai skills import proprietario/repo/caminho/para/habilidade --company-id <company-id>

# Vincular habilidades da empresa a um agente após instalação/importação
npx paperclipai skills agent sync <agent-id> --skill github-pr-workflow --mode add --company-id <company-id>
```

## Comandos de Aprovação (Approval Commands)

```sh
# Listar aprovações
npx paperclipai approval list [--status pending]

# Obter aprovação
npx paperclipai approval get <approval-id>

# Criar aprovação
npx paperclipai approval create --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]

# Aprovar
npx paperclipai approval approve <approval-id> [--decision-note "..."]

# Rejeitar
npx paperclipai approval reject <approval-id> [--decision-note "..."]

# Solicitar revisão
npx paperclipai approval request-revision <approval-id> [--decision-note "..."]

# Reenviar
npx paperclipai approval resubmit <approval-id> [--payload '{"..."}']

# Comentar
npx paperclipai approval comment <approval-id> --body "..."
```

## Comandos de Atividade (Activity Commands)

```sh
npx paperclipai activity list [--agent-id <id>] [--entity-type issue] [--entity-id <id>]
```

## Painel (Dashboard)

```sh
npx paperclipai dashboard get
```

## Configurações da Instância (Instance Settings)

```sh
npx paperclipai instance settings:general
npx paperclipai instance settings:general:update --payload-json '{...}'
npx paperclipai instance settings:experimental
npx paperclipai instance settings:experimental:update --payload-json '{...}'
```

Recursos experimentais são opcionais (opt-in) e fornecidos sem garantias de compatibilidade. Podem quebrar, mudar ou ser removidos a qualquer momento. Use por sua própria conta e risco.
