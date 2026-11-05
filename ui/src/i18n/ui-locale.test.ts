import { afterEach, describe, expect, it } from "vitest";
import { i18n, setUiLocale } from ".";
import { UI_LOCALE_STORAGE_KEY } from "./locales";

describe("ui locale selection", () => {
  afterEach(async () => {
    await setUiLocale("en");
  });

  it("switches the interface language and remembers the choice", async () => {
    await setUiLocale("pt-BR");

    expect(i18n.language).toBe("pt-BR");
    expect(globalThis.localStorage.getItem(UI_LOCALE_STORAGE_KEY)).toBe("pt-BR");
  });
});
