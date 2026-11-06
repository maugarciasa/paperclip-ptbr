import type { Resource } from "i18next";

import { assertValidLocaleMessages } from "./locale-validation";

export const DEFAULT_LOCALE = "en" as const;
// Idioma exibido por padrão no fork; o inglês segue como fallback.
export const UI_LOCALE = "pt-BR" as const;
// Escolha do usuário no seletor de idioma, guardada no navegador.
export const UI_LOCALE_STORAGE_KEY = "paperclip:ui-locale";
// Nomes são mostrados no próprio idioma, para quem não entende o atual.
export const UI_LANGUAGE_OPTIONS = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en", label: "English" },
] as const;

// Só os idiomas do seletor entram no bundle: os outros arquivos em locales/ não são
// carregados (cada um pesa ~1 MB). Para oferecer outro idioma, inclua-o aqui e em
// UI_LANGUAGE_OPTIONS.
const localeModules = import.meta.glob("./locales/{en,pt-BR}.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

export const localeMessages = Object.fromEntries(
  Object.entries(localeModules).map(([path, messages]) => {
    const locale = path.match(/\/([A-Za-z0-9_-]+)\.json$/)?.[1];
    if (!locale) {
      throw new Error(`Invalid locale file path: ${path}`);
    }
    return [locale, messages];
  }),
);

if (!(DEFAULT_LOCALE in localeMessages)) {
  throw new Error(`Missing default locale messages for ${DEFAULT_LOCALE}`);
}

for (const [locale, messages] of Object.entries(localeMessages)) {
  try {
    assertValidLocaleMessages(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid ${locale} locale messages: ${message}`);
  }
}

export const supportedLocales = Object.keys(localeMessages);

export const i18nextResources: Resource = Object.fromEntries(
  Object.entries(localeMessages).map(([locale, messages]) => [locale, { translation: messages }]),
) as Resource;

export type SupportedLocale = keyof typeof localeMessages;
