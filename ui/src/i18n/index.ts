import i18n, { type InitOptions, type TOptions } from "i18next";
import { initReactI18next, useTranslation as useReactI18nextTranslation } from "react-i18next";

import {
  DEFAULT_LOCALE,
  UI_LOCALE,
  UI_LOCALE_STORAGE_KEY,
  i18nextResources,
  supportedLocales,
} from "./locales";

function readStoredLocale() {
  try {
    const stored = globalThis.localStorage?.getItem(UI_LOCALE_STORAGE_KEY);
    return stored && supportedLocales.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

const i18nextOptions: InitOptions = {
  resources: i18nextResources,
  lng: readStoredLocale() ?? UI_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: supportedLocales,
  defaultNS: "translation",
  interpolation: { escapeValue: false },
  returnObjects: false,
  initAsync: false,
};

void i18n.use(initReactI18next).init(i18nextOptions).catch((error: unknown) => {
  console.error("Failed to initialize i18next", error);
});

function syncDocumentLang(locale: string) {
  if (typeof document !== "undefined") document.documentElement.lang = locale;
}
syncDocumentLang(i18n.language);
i18n.on("languageChanged", syncDocumentLang);

export function t(
  key: string,
  defaultValueOrOptions?: string | TOptions,
  options?: TOptions,
) {
  if (typeof defaultValueOrOptions === "string") {
    return i18n.t(key, { defaultValue: defaultValueOrOptions, ...(options || {}) });
  }
  return i18n.t(key, defaultValueOrOptions);
}

/** Troca o idioma da interface e lembra a escolha neste navegador. */
export function setUiLocale(locale: string) {
  try {
    globalThis.localStorage?.setItem(UI_LOCALE_STORAGE_KEY, locale);
  } catch {
    // Sem armazenamento (aba privada): a troca vale só nesta sessão.
  }
  return i18n.changeLanguage(locale);
}

export { UI_LANGUAGE_OPTIONS } from "./locales";
export const useTranslation = useReactI18nextTranslation;
export { i18n };
