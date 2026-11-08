# VPS nexus (Hostinger)

Servidor onde o fork pt-BR roda em produção: `https://jarvis.nallon.com.br`. A VPS é
compartilhada com o ERP do Nallon, o CI do Nallon, o DeskcommCRM, o WAHA, o EasyPanel e outros
sites. Nada aqui é só do Paperclip; não remover o que não for dele.

## Acesso

- Host: `31.97.163.204` (hostname `nexus`, Ubuntu 24.04, 96 GB de disco).
- Entrar pelo alias do `~/.ssh/config` da máquina de desenvolvimento (usuário `mau`, root via
  `sudo`):

  ```sh
  ssh nexus
  ```

- A chave (`~/.ssh/id_ed25519_nexus`) fica só no `~/.ssh`. Não copiar para o repositório.
- O GitHub Actions entra com outra chave (`VPS_SSH_KEY`), que no `authorized_keys` só executa
  `~/paperclip/atualizar.sh`.

## Paperclip

- Pasta: `~/paperclip` (`docker-compose.yml`, `.env`, `data/`, `pgdata/`). Containers `paperclip`
  e `paperclip-db`, atrás do Traefik do EasyPanel, porta local `127.0.0.1:3100`.
- Imagem: `ghcr.io/maugarciasa/paperclip-video`, fixada por digest no compose.
- Deploy: o workflow "Imagem pt-BR" (`.github/workflows/ptbr-image.yml`) publica a imagem e roda
  `atualizar.sh`, que faz backup do banco em `~/backups/` e troca o digest. Voltar:
  `~/paperclip/atualizar.sh reverter`.
- Saúde: `curl http://127.0.0.1:3100/api/health` deve responder 200.

## Disco

A imagem de produção passa de 17 GB e cada deploy baixa uma nova. Sem limpeza, o disco enche e o
deploy falha com `no space left on device`. Em 08/11/2026 o disco estava em 96% e o
`docker image prune -a` liberou 43 GB. Antes de limpar, conferir `docker system df`. O prune só
remove imagens sem nenhum contêiner associado.
