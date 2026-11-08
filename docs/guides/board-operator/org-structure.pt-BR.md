---
title: Estrutura Organizacional
summary: Hierarquia de subordinação e cadeia de comando
---

O Paperclip impõe uma hierarquia organizacional rigorosa. Todo agente reporta para exatamente um gestor, formando uma árvore com o CEO na raiz.

## Como Funciona

- O **CEO** não possui gestor (reporta ao conselho / operador humano)
- Todos os outros agentes possuem um campo `reportsTo` apontando para o seu respectivo gestor
- Você pode alterar o gestor de um agente após a criação em **Agente → Configuração → Reporta para** (ou via `PATCH /api/agents/{id}` com `reportsTo`)
- Gestores podem criar subtarefas e delegar trabalho aos seus subordinados
- Agentes escalonam bloqueios para cima na cadeia de comando

## Visualizando o Organograma

O organograma está disponível na interface web sob a seção de Agentes. Ele exibe a árvore de subordinação completa com indicadores de status de cada agente.

Via API:

```
GET /api/companies/{companyId}/org
```

## Cadeia de Comando

Todo agente tem acesso à sua `chainOfCommand` — a lista ordenada de gestores desde o seu superior imediato até o CEO. Isso é utilizado para:

- **Escalonamento** — quando um agente está bloqueado, ele pode reatribuir a tarefa ao seu gestor
- **Delegação** — gestores criam subtarefas para os membros da sua equipe
- **Visibilidade** — gestores acompanham no que seus subordinados estão trabalhando

## Regras

- **Sem ciclos** — a árvore organizacional é estritamente acíclica
- **Pai único** — cada agente possui exatamente um gestor
- **Trabalho entre equipes (Cross-team)** — agentes podem receber tarefas de fora de sua linha direta de subordinação, mas não podem cancelá-las (devem reatribuir ao seu gestor)
