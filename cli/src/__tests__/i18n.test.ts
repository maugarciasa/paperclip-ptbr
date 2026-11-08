import { describe, expect, it } from "vitest";
import { getLocale, setLocale, t } from "../i18n.js";

describe("CLI i18n", () => {
  it("defaults to pt-BR or detects locale", () => {
    expect(["pt-BR", "en"]).toContain(getLocale());
  });

  it("translates keys in pt-BR", () => {
    setLocale("pt-BR");
    expect(t("common.setupCancelled")).toBe("Configuração cancelada.");
    expect(t("prompts.db.mode")).toBe("Modo do banco de dados");
    expect(t("onboard.title")).toBe("Bem-vindo ao Paperclip");
  });

  it("switches to en and translates properly", () => {
    setLocale("en");
    expect(t("common.setupCancelled")).toBe("Setup cancelled.");
    expect(t("prompts.db.mode")).toBe("Database mode");
    expect(t("onboard.title")).toBe("Welcome to Paperclip");
  });

  it("interpolates parameters", () => {
    setLocale("pt-BR");
    expect(t("prompts.db.portInUse", { port: 5432 })).toBe("A porta 5432 já está em uso");
    setLocale("en");
    expect(t("prompts.db.portInUse", { port: 5432 })).toBe("Port 5432 is already in use");
  });

  it("falls back to default string when key is missing", () => {
    expect(t("missing.key", "Fallback text")).toBe("Fallback text");
  });
});
