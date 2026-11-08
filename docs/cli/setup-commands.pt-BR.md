---
title: Comandos de Configuração (Setup Commands)
summary: Onboard, run, doctor e configure
---

Comandos de inicialização, configuração e diagnósticos de instâncias.

## `paperclipai run`

Inicialização e execução completa com um único comando:

```sh
pnpm paperclipai run
```

O comando realiza automaticamente:

1. Executa o onboarding se a configuração não existir
2. Executa o `paperclipai doctor` com reparo automático habilitado
3. Inicia o servidor quando todas as verificações passarem com sucesso

Escolha uma instância específica:

```sh
npx paperclipai run --instance dev
```

## `paperclipai onboard`

Configuração interativa inicial:

```sh
pnpm paperclipai onboard
```

Se o Paperclip já estiver configurado, executar o `onboard` novamente preserva a configuração existente. Use `paperclipai configure` para alterar parâmetros em uma instalação já existente.

Primeiro prompt:

1. `Quickstart` (recomendado): padrões locais prontos para execução (PostgreSQL embutido, sem provedor de LLM inicial, armazenamento local em disco, chaves padrão)
2. `Advanced setup`: configuração interativa completa

Iniciar imediatamente após o onboarding:

```sh
pnpm paperclipai onboard --run
```

Padrões de Quickstart + início imediato:

```sh
pnpm paperclipai onboard --yes
```

Quando o onboarding inicia o Paperclip a partir de um terminal interativo, ele abre a página de onboarding no seu navegador automaticamente. Terminais não-interativos permanecem silenciosos. Suprima a abertura do navegador explicitamente para execuções headless ou automatizadas com qualquer uma das variáveis de ambiente:

```sh
PAPERCLIP_NO_BROWSER=1 pnpm paperclipai onboard --yes
PAPERCLIP_OPEN_ON_LISTEN=false pnpm paperclipai onboard --yes
```

Em uma instalação existente, a flag `--yes` preserva a configuração atual e apenas inicia o Paperclip com essa estrutura.

## `paperclipai doctor`

Verificações de saúde do sistema com reparo automático opcional:

```sh
pnpm paperclipai doctor
pnpm paperclipai doctor --repair
```

Validações realizadas:

- Configuração do servidor
- Conectividade com o banco de dados
- Configuração do adaptador de segredos, incluindo variáveis não secretas do AWS Secrets Manager quando selecionado
- Configuração do armazenamento
- Arquivos de chave ausentes

## `paperclipai configure`

Atualize seções específicas da configuração:

```sh
pnpm paperclipai configure --section server
pnpm paperclipai configure --section secrets
pnpm paperclipai configure --section storage
```

`--section secrets` atualiza o provedor de nível de implantação usado como fallback para segredos que não visam um cofre específico de empresa. Cofres de provedor por empresa (instâncias nomeadas, seleção de cofre padrão, múltiplos cofres por provedor, suporte futuro a GCP/Vault) ficam na interface do conselho sob `Configurações da Empresa → Segredos → Cofres de provedor` e na API `/api/companies/{companyId}/secret-provider-configs`.

## `paperclipai env`

Exibe a configuração do ambiente resolvida:

```sh
pnpm paperclipai env
```

Isso agora inclui configurações de implantação orientadas a bind, como `PAPERCLIP_BIND` e `PAPERCLIP_BIND_HOST` quando configuradas.

## `paperclipai allowed-hostname`

Permite um hostname privado para modo autenticado/privado:

```sh
npx paperclipai allowed-hostname my-tailscale-host
```

## Caminhos de Armazenamento Local

| Dados | Caminho Padrão |
|-------|----------------|
| Configuração | `~/.paperclip/instances/default/config.json` |
| Banco de Dados | `~/.paperclip/instances/default/db` |
| Logs | `~/.paperclip/instances/default/logs` |
| Armazenamento | `~/.paperclip/instances/default/data/storage` |
| Chave Mestra de Segredos | `~/.paperclip/instances/default/secrets/master.key` |

Substitua com:

```sh
PAPERCLIP_HOME=/custom/home PAPERCLIP_INSTANCE_ID=dev pnpm paperclipai run
```

Ou passe `--data-dir` diretamente em qualquer comando:

```sh
npx paperclipai run --data-dir ./tmp/paperclip-dev
npx paperclipai doctor --data-dir ./tmp/paperclip-dev
```
