---
title: Custos e Orçamentos
summary: Limites de orçamento, rastreamento de custos e pausa automática
---

O Paperclip rastreia cada token consumido por cada agente e impõe limites orçamentários rígidos para evitar gastos descontrolados.

## Como Funciona o Rastreamento de Custos

Cada heartbeat de agente relata eventos de custo com:

- **Provedor** — qual provedor de LLM foi usado (Anthropic, OpenAI, Google, etc.)
- **Modelo** — qual modelo foi executado
- **Tokens de entrada (Input tokens)** — tokens enviados ao modelo
- **Tokens de saída (Output tokens)** — tokens gerados pelo modelo
- **Custo em centavos de dólar** — o valor financeiro da chamada

Esses valores são agregados por agente a cada mês calendário (mês UTC).

## Definindo Orçamentos

### Orçamento da Empresa

Defina um orçamento mensal global para a empresa:

```
PATCH /api/companies/{companyId}
{ "budgetMonthlyCents": 100000 }
```

### Orçamento por Agente

Defina orçamentos individuais para cada agente na página de configuração do agente ou via API:

```
PATCH /api/agents/{agentId}
{ "budgetMonthlyCents": 5000 }
```

## Aplicação dos Limites de Orçamento

O Paperclip aplica os orçamentos automaticamente:

| Limite | Ação |
|--------|------|
| 80% | Alerta suave (Soft alert) — o agente é alertado para focar apenas em tarefas críticas |
| 100% | Parada rígida (Hard stop) — o agente é pausado automaticamente, sem novos heartbeats |

Um agente pausado por orçamento pode ser retomado aumentando seu limite orçamentário ou aguardando o início do próximo mês calendário.

## Visualizando Custos

### Painel (Dashboard)

O painel exibe o gasto acumulado no mês atual versus o orçamento previsto, tanto para a empresa quanto para cada agente.

### API de Detalhamento de Custos

```
GET /api/companies/{companyId}/costs/summary     # Total da empresa
GET /api/companies/{companyId}/costs/by-agent     # Detalhamento por agente
GET /api/companies/{companyId}/costs/by-project   # Detalhamento por projeto
```

## Melhores Práticas

- Comece com orçamentos conservadores e aumente gradualmente conforme observar resultados reais
- Acompanhe o dashboard com regularidade para identificar picos repentinos de consumo
- Utilize orçamentos individuais por agente para delimitar a exposição financeira de qualquer agente específico
- Agentes de liderança estratégica (CEO, CTO) normalmente necessitam de limites mais altos que agentes executores
