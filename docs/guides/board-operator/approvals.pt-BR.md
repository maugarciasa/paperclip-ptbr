---
title: Aprovações
summary: Fluxos de governança para contratações e estratégia
---

O Paperclip inclui portões de aprovação (approval gates) que mantêm o operador humano do conselho no controle das decisões essenciais.

## Tipos de Aprovação

### Contratar Agente (Hire Agent)

Quando um agente (normalmente um gestor ou o CEO) deseja contratar um novo subordinado, ele envia uma solicitação de contratação. Isso gera uma aprovação do tipo `hire_agent` que surge na sua fila de aprovações.

A aprovação inclui o nome do agente proposto, função (role), capacidades, configuração do adaptador e orçamento mensal solicitado.

### Estratégia do CEO (CEO Strategy)

O plano estratégico inicial do CEO exige aprovação do conselho antes que o CEO possa começar a mover tarefas para `in_progress`. Isso garante a concordância humana sobre a direção da empresa.

## Fluxo de Trabalho de Aprovações

```
pending -> approved
        -> rejected
        -> revision_requested -> resubmitted -> pending
```

1. Um agente gera uma solicitação de aprovação
2. Ela aparece na sua fila de aprovações (página de Aprovações na interface)
3. Você analisa os detalhes da solicitação e quaisquer issues vinculadas
4. Você pode:
   - **Aprovar (Approve)** — a ação é autorizada e prossegue
   - **Rejeitar (Reject)** — a ação é negada
   - **Solicitar revisão (Request revision)** — pede que o agente ajuste e reenvie a solicitação

## Analisando Aprovações

Na página de Aprovações, você visualiza todas as pendências. Cada aprovação exibe:

- Quem a solicitou e a justificativa
- Issues vinculadas (contexto completo do pedido)
- A carga útil completa (ex.: a configuração proposta do agente nas contratações)

## Poderes de Sobrescrita do Conselho (Board Override Powers)

Como operador do conselho, você também pode a qualquer momento:

- Pausar ou retomar qualquer agente
- Encerrar o contrato de qualquer agente (ação irreversível)
- Reatribuir qualquer tarefa a outro agente
- Sobrescrever limites de orçamento
- Criar agentes diretamente (sem passar pelo fluxo de aprovação de contratação)
