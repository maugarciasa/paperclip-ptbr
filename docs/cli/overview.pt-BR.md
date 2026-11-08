---
title: Visão Geral da CLI
summary: Instalação e configuração da CLI do Paperclip
---

A CLI do Paperclip gerencia a configuração de instâncias, diagnósticos do sistema e operações do plano de controle.

## Uso

```sh
pnpm paperclipai --help
```

## Opções Globais

Todos os comandos suportam:

| Flag | Descrição |
|------|-----------|
| `--data-dir <caminho>` | Diretório raiz local de dados do Paperclip (isola de `~/.paperclip`) |
| `--api-base <url>` | URL base da API |
| `--api-key <token>` | Token de autenticação da API |
| `--context <caminho>` | Caminho do arquivo de contexto |
| `--profile <nome>` | Nome do perfil de contexto |
| `--json` | Saída formatada em JSON |

Comandos no escopo de empresa também aceitam `--company-id <id>`.

Para instâncias locais limpas, passe `--data-dir` no comando executado:

```sh
npx paperclipai run --data-dir ./tmp/paperclip-dev
```

## Perfis de Contexto

Armazene padrões para não precisar repetir flags:

```sh
# Definir padrões
npx paperclipai context set --api-base http://localhost:3100 --company-id <id>

# Visualizar contexto atual
pnpm paperclipai context show

# Listar perfis
pnpm paperclipai context list

# Alternar perfil
npx paperclipai context use default
```

Para evitar o armazenamento de segredos no arquivo de contexto, use uma variável de ambiente:

```sh
npx paperclipai context set --api-key-env-var-name PAPERCLIP_API_KEY
export PAPERCLIP_API_KEY=...
```

Operações com segredos estão disponíveis sob `paperclipai secrets`:

```sh
npx paperclipai secrets declarations --company-id <company-id> --kind secret
npx paperclipai secrets create --company-id <company-id> --name anthropic-api-key --value-env ANTHROPIC_API_KEY
npx paperclipai secrets link --company-id <company-id> --name prod-stripe-key --provider aws_secrets_manager --external-ref <provider-ref>
npx paperclipai secrets doctor --company-id <company-id>
npx paperclipai secrets migrate-inline-env --company-id <company-id> --apply
```

O contexto fica armazenado em `~/.paperclip/context.json`.

## Categorias de Comandos

A CLI possui duas categorias principais:

1. **[Comandos de Configuração (Setup commands)](/cli/setup-commands)** — bootstrap de instância, diagnósticos, configuração
2. **[Comandos do Plano de Controle (Control-plane commands)](/cli/control-plane-commands)** — issues, agentes, aprovações, atividades
