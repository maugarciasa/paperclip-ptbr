---
name: paperclip-converting-plans-to-tasks
description: >
  Decida se o trabalho no Paperclip precisa de delegação e conecte tarefas justificadas
  com proprietários e dependências reais. Use ao transformar um plano autorizado em tarefas de trabalho.
---

# Planos em Tarefas (Plans to tasks)

Mantenha trabalhos pequenos e coesos em sua tarefa comum atual com um único responsável do início ao fim.
As etapas, arquivos e fases de um plano não precisam, cada um, de uma tarefa individual.

Crie uma tarefa separada somente quando houver um limite útil: outro responsável ou permissão,
entrega paralela independente, um pré-requisito real, revisão independente ou um
desdobramento substancial que necessite de seu próprio ciclo de vida. Verifique os agentes disponíveis antes de atribuir.
Dê a cada delegado contexto suficiente e uma entrega clara para trabalhar de forma independente.
Pessoas leem essas descrições: referencie outras tarefas e documentos com links de identificador (por exemplo, `[BRA-2](/BRA/issues/BRA-2#document-plan)`), nunca UUIDs puros.

Defina dependências reais através de `blockedByIssueIds` (ou da ferramenta de dependências nativa).
Aninhamento pai/filho e texto explicativo não atrasam a execução. Trabalhos independentes podem começar
agora; trabalhos dependentes devem aguardar seus pré-requisitos. Verifique as relações salvas.

Revisores publicam suas conclusões em sua própria tarefa de revisão e a concluem, inclusive em caso de
veredito adverso. Torne sua descrição autossuficiente. Conecte o veredito ao
responsável que deve agir sobre ele; não exija gravações no item pai.

Respeite as fronteiras existentes de autorização e aprovação. Use os mecanismos de planejamento
do Paperclip quando a aprovação for necessária; a decomposição de tarefas não cria novos portões de aprovação.
