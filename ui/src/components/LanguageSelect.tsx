import { Languages } from "lucide-react";

import { UI_LANGUAGE_OPTIONS, setUiLocale, useTranslation } from "@/i18n";

/** Seletor de idioma da interface, na mesma linha de ações do menu da conta. */
export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  return (
    <label className="flex h-(--profile-popover-row-height) w-full cursor-pointer items-center gap-(--profile-popover-row-gap) rounded-lg px-2.5 text-(length:--text-compact) font-medium leading-(--profile-popover-label-line-height) text-foreground transition-colors hover:bg-accent">
      <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
        <Languages className="size-4" />
      </span>
      <span className="min-w-0 flex-1 truncate">{t("nav.sidebarAccountMenu.language")}</span>
      <select
        className="max-w-36 cursor-pointer bg-transparent text-right text-muted-foreground outline-none"
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={(event) => void setUiLocale(event.target.value)}
      >
        {UI_LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
