import type { AgentRunner, AgentRunnerChoice } from "@paperclipai/shared";
import { Field } from "./agent-config-primitives";
import { SelectPopover } from "./ui/select";
import { Button } from "./ui/button";
import { useTranslation } from "@/i18n";

export function AgentRunnerSelect({
  value,
  onChange,
  defaultRunner,
  supportedRunners = ["legacy"],
  disabled,
  pending,
  error,
  onRetry,
}: {
  value: AgentRunnerChoice;
  onChange: (value: AgentRunnerChoice) => void;
  defaultRunner?: AgentRunner;
  supportedRunners?: readonly AgentRunner[];
  disabled?: boolean;
  pending?: boolean;
  error?: string;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  const paperclipLabel = t("agents.AgentRunnerSelect.paperclipRunner");
  const legacyLabel = t("agents.AgentRunnerSelect.legacyRunner");
  return (
    <Field label={t("agents.AgentRunnerSelect.runner")}>
      <SelectPopover
        aria-label={t("agents.AgentRunnerSelect.runner")}
        disabled={disabled}
        value={value}
        displayValue={value === "auto" ? (defaultRunner ? t("agents.AgentRunnerSelect.defaultRunner", { runner: defaultRunner === "paperclip" ? paperclipLabel : legacyLabel }) : pending ? t("agents.AgentRunnerSelect.checkingAvailability") : t("agents.AgentRunnerSelect.automaticUnavailable")) : undefined}
        onValueChange={next => onChange(next as AgentRunnerChoice)}
        options={[
          { value: "paperclip", label: defaultRunner === "paperclip" ? t("agents.AgentRunnerSelect.defaultRunner", { runner: paperclipLabel }) : paperclipLabel, disabled: !supportedRunners.includes("paperclip") && value !== "paperclip" },
          { value: "legacy", label: defaultRunner === "legacy" ? t("agents.AgentRunnerSelect.defaultRunner", { runner: legacyLabel }) : legacyLabel, disabled: !supportedRunners.includes("legacy") && value !== "legacy" },
        ]}
      />
      {error && <div className="mt-2 space-y-2">
        <p role="alert" className="text-sm text-destructive">{error}</p>
        {onRetry && <Button type="button" variant="outline" size="sm" disabled={pending || disabled} onClick={onRetry}>{t("agents.AgentRunnerSelect.retryDiscovery")}</Button>}
      </div>}
    </Field>
  );
}
