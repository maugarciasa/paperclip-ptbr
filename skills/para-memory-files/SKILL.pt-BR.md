---
name: para-memory-files
description: >
  Utilize um sistema de memória PARA baseado em arquivos para armazenar, recuperar e organizar
  conhecimento durável entre sessões. Disparado ao salvar fatos, notas diárias, registros
  de entidades, síntese semanal, lembrança (recall), padrões tácitos do usuário ou memória de planos.
---

# Arquivos de Memória PARA (PARA Memory Files)

Memória persistente baseada em arquivos, organizada pelo método PARA de Tiago Forte. Três camadas: um grafo de conhecimento, notas diárias e conhecimento tácito. Todos os caminhos são relativos a `$AGENT_HOME`.

## Três Camadas de Memória

### Camada 1: Grafo de Conhecimento (`$AGENT_HOME/life/` -- PARA)

Armazenamento baseado em entidades. Cada entidade ganha uma pasta com dois níveis:

1. `summary.md` -- contexto rápido, carregado primeiro.
2. `items.yaml` -- fatos atômicos, carregados sob demanda.

```text
$AGENT_HOME/life/
  projects/          # Trabalho ativo com metas/prazos claros
    <name>/
      summary.md
      items.yaml
  areas/             # Responsabilidades contínuas, sem data de término
    people/<name>/
    companies/<name>/
  resources/         # Material de referência, tópicos de interesse
    <topic>/
  archives/          # Itens inativos das outras três categorias
  index.md
```

**Regras do PARA:**

- **Projetos (Projects)** -- trabalho ativo com uma meta ou prazo. Mova para arquivos mortos (archives) quando concluído.
- **Áreas (Areas)** -- contínuas (pessoas, empresas, responsabilidades). Sem data de término.
- **Recursos (Resources)** -- material de referência, tópicos de interesse.
- **Arquivos Mortos (Archives)** -- itens inativos de qualquer categoria.

**Regras para fatos:**

- Salve fatos duradouros imediatamente em `items.yaml`.
- Semanalmente: reescreva `summary.md` a partir dos fatos ativos.
- Nunca delete fatos. Em vez disso, substitua-os (`status: superseded`, adicione `superseded_by`).
- Quando uma entidade ficar inativa, mova sua pasta para `$AGENT_HOME/life/archives/`.

**Quando criar uma entidade:**

- Mencionada 3+ vezes, OU
- Relação direta com o usuário (família, colega de trabalho, parceiro, cliente), OU
- Projeto ou empresa significativa na vida do usuário.
- Caso contrário, anote nas notas diárias.

Para o esquema YAML de fatos atômicos e regras de decaimento de memória, consulte [references/schemas.md](references/schemas.md).

### Camada 2: Notas Diárias (`$AGENT_HOME/memory/YYYY-MM-DD.md`)

Linha do tempo bruta dos eventos -- a camada do "quando".

- Escreva continuamente durante as conversas.
- Extraia fatos duradouros para a Camada 1 durante os heartbeats.

### Camada 3: Conhecimento Tácito (`$AGENT_HOME/MEMORY.md`)

Como o usuário opera -- padrões, preferências, lições aprendidas.

- Não são fatos sobre o mundo; são fatos sobre o usuário.
- Atualize sempre que aprender novos padrões operacionais.

## Escreva -- Não Conte com Memória Mental

A memória não sobrevive a reinicializações de sessão. Arquivos sobrevivem.

- Quer lembrar de algo -> ESCREVA EM UM ARQUIVO.
- "Lembre-se disso" -> atualize `$AGENT_HOME/memory/YYYY-MM-DD.md` ou o arquivo da entidade relevante.
- Aprendeu uma lição -> atualize `AGENTS.md`, `TOOLS.md` ou o arquivo de habilidade relevante.
- Cometeu um erro -> documente-o para que o seu eu futuro não o repita.
- Arquivos de texto no disco são sempre melhores do que manter informações em contexto temporário.

## Recuperação de Memória -- Use o qmd

Use o `qmd` em vez de fazer grep em arquivos:

```bash
qmd query "o que aconteceu no Natal"      # Busca semântica com reranking
qmd search "frase específica"             # Busca por palavra-chave BM25
qmd vsearch "pergunta conceitual"         # Similaridade vetorial pura
```

Indexe sua pasta pessoal: `qmd index $AGENT_HOME`

Vetores + BM25 + reranking encontram informações mesmo quando a formulação das palavras difere.

## Planejamento

Mantenha planos em arquivos com registro de data/hora em `plans/` na raiz do projeto (fora da memória pessoal para que outros agentes possam acessá-los). Use `qmd` para buscar planos. Planos ficam desatualizados -- se existir um plano mais recente, não se confunda com uma versão antiga. Se notar desatualização, atualize o arquivo para anotar por quem ele foi substituído (`supersededBy`).
