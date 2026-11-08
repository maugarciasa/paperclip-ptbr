export type Locale = "pt-BR" | "en";

function detectLocale(): Locale {
  const env = (
    process.env.PAPERCLIP_LOCALE ||
    process.env.LC_ALL ||
    process.env.LC_MESSAGES ||
    process.env.LANG ||
    ""
  ).toLowerCase();

  if (env.startsWith("en") || env.includes("en_us") || env.includes("en_gb")) {
    return "en";
  }
  // Default for this Brazilian Portuguese fork
  return "pt-BR";
}

let currentLocale: Locale = detectLocale();

export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export const messages: Record<Locale, Record<string, string>> = {
  "en": {
    "common.setupCancelled": "Setup cancelled.",
    "common.recommended": "recommended",
    "common.required": "Required",
    "common.yes": "Yes",
    "common.no": "No",
    "common.continue": "Continue",
    "common.cancel": "Cancel",
    "common.back": "Back",
    "common.saved": "Saved.",
    "common.startPaperclipNow": "Start Paperclip now?",
    "common.chooseSetupPath": "Choose setup path",
    "common.quickstart": "Quickstart",
    "common.quickstartHint": "Recommended: local defaults + ready to run",
    "common.advancedSetup": "Advanced setup",
    "common.advancedSetupHint": "Customize database, server, storage, and more",

    // Prompts: Database
    "prompts.db.mode": "Database mode",
    "prompts.db.embedded": "Embedded PostgreSQL (managed locally)",
    "prompts.db.external": "PostgreSQL (external server)",
    "prompts.db.connString": "PostgreSQL connection string",
    "prompts.db.connStringRequired": "Connection string is required for PostgreSQL mode",
    "prompts.db.connStringInvalid": "Must be a postgres:// or postgresql:// URL",
    "prompts.db.dataDir": "Embedded PostgreSQL data directory",
    "prompts.db.port": "Embedded PostgreSQL port",
    "prompts.db.portInvalid": "Must be a valid port number (1-65535)",
    "prompts.db.portInUse": "Port {{port}} is already in use",
    "prompts.db.backupsEnabled": "Enable automatic database backups?",
    "prompts.db.backupInterval": "Backup interval (minutes)",
    "prompts.db.backupRetention": "Backup retention (days)",
    "prompts.db.backupDir": "Backup directory",

    // Prompts: Server
    "prompts.server.reachability": "Reachability",
    "prompts.server.trustedLocal": "Trusted local",
    "prompts.server.trustedLocalHint": "Recommended for first run: localhost only, no login friction",
    "prompts.server.lan": "Private network",
    "prompts.server.lanHint": "Broad private bind for LAN, VPN, or legacy --tailscale-auth style access",
    "prompts.server.tailnet": "Tailnet",
    "prompts.server.tailnetHint": "Private authenticated access using the machine's detected Tailscale address",
    "prompts.server.custom": "Custom",
    "prompts.server.customHint": "Choose exact auth mode, exposure, and host manually",
    "prompts.server.port": "Server port",
    "prompts.server.publicUrl": "Public URL where Paperclip is reachable",
    "prompts.server.allowedOrigins": "Allowed browser origins (CORS, comma-separated)",

    // Prompts: Storage
    "prompts.storage.provider": "Storage provider",
    "prompts.storage.localDisk": "Local disk (recommended)",
    "prompts.storage.localDiskHint": "best for single-user local deployments",
    "prompts.storage.s3": "S3 compatible",
    "prompts.storage.s3Hint": "for cloud/object storage backends",
    "prompts.storage.baseDir": "Local storage base directory",
    "prompts.storage.baseDirRequired": "Storage base directory is required",

    // Prompts: Secrets
    "prompts.secrets.provider": "Secrets provider",
    "prompts.secrets.localEncrypted": "Local encrypted (recommended)",
    "prompts.secrets.localEncryptedHint": "best for single-developer installs",
    "prompts.secrets.aws": "AWS Secrets Manager",
    "prompts.secrets.awsHint": "requires runtime AWS credentials and provider env config",
    "prompts.secrets.gcp": "GCP Secret Manager",
    "prompts.secrets.gcpHint": "requires external adapter integration",
    "prompts.secrets.vault": "HashiCorp Vault",
    "prompts.secrets.vaultHint": "requires external adapter integration",
    "prompts.secrets.strictMode": "Require secret refs for sensitive env vars?",

    // Prompts: LLM
    "prompts.llm.provider": "Default LLM provider",
    "prompts.llm.apiKey": "API key for {{provider}}",

    // Commands: Onboard
    "onboard.title": "Welcome to Paperclip",
    "onboard.subtitle": "Orchestrate AI agent teams to run your business",
    "onboard.success": "Paperclip setup complete!",
    "onboard.nextCommands": "Next commands",

    // Commands: Doctor
    "doctor.title": "paperclip doctor",
    "doctor.checking": "Checking environment and services...",
    "doctor.allPassed": "All checks passed!",
    "doctor.issuesFound": "Some issues were detected:",
    "doctor.passed": "passed",
    "doctor.warnings": "warnings",
    "doctor.failed": "failed",
    "doctor.summary": "Summary",
    "doctor.checksFailed": "Some checks failed. Fix the issues above and re-run doctor.",
    "doctor.passedWithWarnings": "All critical checks passed with some warnings.",
    "doctor.repairConfirm": "Repair \"{{name}}\"?",
    "doctor.repaired": "Repaired: {{name}}",
    "doctor.repairFailed": "Repair failed: {{error}}",

    // Commands: Service
    "service.starting": "Starting Paperclip service...",
    "service.started": "Paperclip service started successfully.",
    "service.stopping": "Stopping Paperclip service...",
    "service.stopped": "Paperclip service stopped.",
    "service.status": "Service status: {{status}}",

    // Commands: Update
    "update.checking": "Checking for updates...",
    "update.upToDate": "Paperclip is up to date (version {{version}}).",
    "update.available": "New version available: {{latest}} (current: {{current}})."
  },
  "pt-BR": {
    "common.setupCancelled": "Configuração cancelada.",
    "common.recommended": "recomendado",
    "common.required": "Obrigatório",
    "common.yes": "Sim",
    "common.no": "Não",
    "common.continue": "Continuar",
    "common.cancel": "Cancelar",
    "common.back": "Voltar",
    "common.saved": "Salvo com sucesso.",
    "common.startPaperclipNow": "Deseja iniciar o Paperclip agora?",
    "common.chooseSetupPath": "Escolha o fluxo de configuração",
    "common.quickstart": "Início Rápido (Quickstart)",
    "common.quickstartHint": "Recomendado: padrões locais + pronto para rodar",
    "common.advancedSetup": "Configuração avançada",
    "common.advancedSetupHint": "Personalize banco de dados, servidor, armazenamento e mais",

    // Prompts: Database
    "prompts.db.mode": "Modo do banco de dados",
    "prompts.db.embedded": "PostgreSQL Embutido (gerenciado localmente)",
    "prompts.db.external": "PostgreSQL Externo (servidor dedicado)",
    "prompts.db.connString": "String de conexão do PostgreSQL",
    "prompts.db.connStringRequired": "A string de conexão é obrigatória para o modo PostgreSQL externo",
    "prompts.db.connStringInvalid": "Deve ser uma URL postgres:// ou postgresql://",
    "prompts.db.dataDir": "Diretório de dados do PostgreSQL embutido",
    "prompts.db.port": "Porta do PostgreSQL embutido",
    "prompts.db.portInvalid": "Deve ser uma porta válida (1-65535)",
    "prompts.db.portInUse": "A porta {{port}} já está em uso",
    "prompts.db.backupsEnabled": "Ativar backups automáticos do banco de dados?",
    "prompts.db.backupInterval": "Intervalo entre backups (em minutos)",
    "prompts.db.backupRetention": "Retenção de backups (em dias)",
    "prompts.db.backupDir": "Diretório de backups",

    // Prompts: Server
    "prompts.server.reachability": "Alcance de rede (Reachability)",
    "prompts.server.trustedLocal": "Local confiável (Trusted local)",
    "prompts.server.trustedLocalHint": "Recomendado para primeiro uso: apenas localhost, sem atrito de login",
    "prompts.server.lan": "Rede privada (LAN / VPN)",
    "prompts.server.lanHint": "Acesso amplo em rede local, VPN ou estilo --tailscale-auth",
    "prompts.server.tailnet": "Tailnet (Tailscale)",
    "prompts.server.tailnetHint": "Acesso privado autenticado usando o endereço Tailscale da máquina",
    "prompts.server.custom": "Personalizado",
    "prompts.server.customHint": "Escolher manualmente o modo de autenticação, exposição e host",
    "prompts.server.port": "Porta do servidor",
    "prompts.server.publicUrl": "URL pública onde o Paperclip estará acessível",
    "prompts.server.allowedOrigins": "Origens de navegador permitidas (CORS, separadas por vírgula)",

    // Prompts: Storage
    "prompts.storage.provider": "Provedor de armazenamento",
    "prompts.storage.localDisk": "Disco local (recomendado)",
    "prompts.storage.localDiskHint": "ideal para instalações locais de desenvolvedor",
    "prompts.storage.s3": "Compatível com S3",
    "prompts.storage.s3Hint": "para armazenamento em nuvem/objetos (AWS, MinIO, R2)",
    "prompts.storage.baseDir": "Diretório base de armazenamento local",
    "prompts.storage.baseDirRequired": "O diretório base de armazenamento é obrigatório",

    // Prompts: Secrets
    "prompts.secrets.provider": "Provedor de segredos",
    "prompts.secrets.localEncrypted": "Armazém local criptografado (recomendado)",
    "prompts.secrets.localEncryptedHint": "ideal para instalações de um único desenvolvedor",
    "prompts.secrets.aws": "AWS Secrets Manager",
    "prompts.secrets.awsHint": "requer credenciais AWS em tempo de execução",
    "prompts.secrets.gcp": "GCP Secret Manager",
    "prompts.secrets.gcpHint": "requer integração de adaptador externo",
    "prompts.secrets.vault": "HashiCorp Vault",
    "prompts.secrets.vaultHint": "requer integração de adaptador externo",
    "prompts.secrets.strictMode": "Exigir referências de segredo para variáveis sensíveis?",

    // Prompts: LLM
    "prompts.llm.provider": "Provedor padrão de LLM",
    "prompts.llm.apiKey": "Chave de API para {{provider}}",

    // Commands: Onboard
    "onboard.title": "Bem-vindo ao Paperclip",
    "onboard.subtitle": "Orquestre equipes de agentes de IA para gerenciar sua empresa",
    "onboard.success": "Configuração do Paperclip concluída com sucesso!",
    "onboard.nextCommands": "Próximos comandos",

    // Commands: Doctor
    "doctor.title": "paperclip doctor",
    "doctor.checking": "Verificando ambiente e serviços...",
    "doctor.allPassed": "Todas as verificações foram aprovadas!",
    "doctor.issuesFound": "Alguns problemas foram identificados:",
    "doctor.passed": "aprovadas",
    "doctor.warnings": "avisos",
    "doctor.failed": "falhas",
    "doctor.summary": "Resumo",
    "doctor.checksFailed": "Algumas verificações falharam. Corrija os problemas acima e execute o doctor novamente.",
    "doctor.passedWithWarnings": "Todas as verificações críticas foram aprovadas com alguns avisos.",
    "doctor.repairConfirm": "Reparar \"{{name}}\"?",
    "doctor.repaired": "Reparado com sucesso: {{name}}",
    "doctor.repairFailed": "Falha no reparo: {{error}}",

    // Commands: Service
    "service.starting": "Iniciando o serviço do Paperclip...",
    "service.started": "Serviço do Paperclip iniciado com sucesso.",
    "service.stopping": "Parando o serviço do Paperclip...",
    "service.stopped": "Serviço do Paperclip parado com sucesso.",
    "service.status": "Status do serviço: {{status}}",

    // Commands: Update
    "update.checking": "Verificando atualizações...",
    "update.upToDate": "O Paperclip está atualizado (versão {{version}}).",
    "update.available": "Nova versão disponível: {{latest}} (versão atual: {{current}})."
  }
};

export function t(
  key: string,
  fallbackOrParams?: string | Record<string, string | number>,
  params?: Record<string, string | number>
): string {
  const fallback = typeof fallbackOrParams === "string" ? fallbackOrParams : undefined;
  const interpolations = typeof fallbackOrParams === "object" ? fallbackOrParams : params;

  let template = messages[currentLocale]?.[key] || fallback || messages["en"]?.[key] || key;

  if (interpolations) {
    for (const [k, v] of Object.entries(interpolations)) {
      template = template.replaceAll(`{{${k}}}`, String(v));
    }
  }

  return template;
}
