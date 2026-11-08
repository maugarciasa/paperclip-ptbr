---
title: Início Rápido (Quickstart)
summary: Coloque o Paperclip em execução em minutos
---

Coloque o Paperclip em execução localmente em menos de 5 minutos.

## Início Rápido (Recomendado)

```sh
npx paperclipai onboard --yes
```

Isso guiará você pela configuração inicial, configurará seu ambiente e colocará o Paperclip em execução.

Se você já possui uma instalação do Paperclip, executar `onboard` novamente mantém suas configurações atuais e diretórios de dados intactos. Use `paperclipai configure` se desejar editar as configurações.

Para iniciar o Paperclip novamente mais tarde:

```sh
npx paperclipai run
```

> **Nota:** Se você usou o `npx` para a configuração inicial, sempre use `npx paperclipai` para executar comandos. O formato `pnpm paperclipai` só funciona dentro de uma cópia clonada do repositório do Paperclip (consulte Desenvolvimento Local abaixo).

## Desenvolvimento Local

Para contribuidores que trabalham no próprio código do Paperclip. Pré-requisitos: Node.js 24.11+ e pnpm 9+.

Clone o repositório e, em seguida:

```sh
pnpm install
pnpm dev
```

Isso inicia o servidor da API e a interface de usuário (UI) em [http://localhost:3100](http://localhost:3100).

Nenhum banco de dados externo é necessário — o Paperclip usa uma instância embutida do PostgreSQL por padrão.

Ao trabalhar a partir do repositório clonado, você também pode usar:

```sh
pnpm paperclipai run
```

Isso executa a integração (onboard) automaticamente se a configuração estiver ausente, executa verificações de integridade com auto-reparo e inicia o servidor.

## Próximos Passos

Assim que o Paperclip estiver em execução:

1. Crie sua primeira empresa na interface web
2. Defina uma meta para a empresa
3. Crie um agente CEO e configure seu adaptador
4. Estruture o organograma com mais agentes
5. Defina orçamentos e atribua as tarefas iniciais
6. Dê a partida — os agentes iniciam seus heartbeats e a empresa entra em operação

<Card title="Conceitos Fundamentais" href="/start/core-concepts">
  Aprenda os conceitos-chave por trás do Paperclip
</Card>
