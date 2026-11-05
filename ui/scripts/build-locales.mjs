// Mescla src/i18n/fragments/*.json em src/i18n/locales/{en,pt-BR}.json
// e confere se toda chave t("...") usada no código existe no inglês.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const uiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const fragmentsDir = join(uiRoot, "src/i18n/fragments");
const localesDir = join(uiRoot, "src/i18n/locales");
const srcDir = join(uiRoot, "src");
const LOCALES = ["en", "pt-BR"];

const isPlainObject = (v) => Boolean(v) && typeof v === "object" && !Array.isArray(v);
const errors = [];

function mergeInto(target, source, fragment, path = []) {
  for (const [key, value] of Object.entries(source)) {
    const at = [...path, key].join(".");
    if (isPlainObject(value)) {
      if (target[key] !== undefined && !isPlainObject(target[key])) {
        errors.push(`${fragment}: ${at} conflita com valor já existente`);
        continue;
      }
      target[key] = target[key] ?? {};
      mergeInto(target[key], value, fragment, [...path, key]);
    } else {
      if (target[key] !== undefined) {
        errors.push(`${fragment}: chave duplicada ${at}`);
        continue;
      }
      target[key] = value;
    }
  }
}

function sortDeep(value) {
  if (!isPlainObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, sortDeep(value[key])]),
  );
}

const fragments = readdirSync(fragmentsDir).filter((f) => f.endsWith(".json")).sort();
const merged = Object.fromEntries(LOCALES.map((locale) => [locale, {}]));

for (const file of fragments) {
  const data = JSON.parse(readFileSync(join(fragmentsDir, file), "utf8"));
  for (const locale of LOCALES) {
    if (!isPlainObject(data[locale])) {
      errors.push(`${file}: falta o bloco "${locale}"`);
      continue;
    }
    mergeInto(merged[locale], data[locale], file);
  }
}

for (const locale of LOCALES) {
  const out = JSON.stringify(sortDeep(merged[locale]), null, 2) + "\n";
  writeFileSync(join(localesDir, `${locale}.json`), out);
}

// Os demais idiomas precisam ter a mesma estrutura do inglês (locale-validation).
// Chaves novas entram com o texto em inglês; traduções existentes não mudam.
function fillMissing(target, reference) {
  let changed = false;
  for (const [key, value] of Object.entries(reference)) {
    if (!(key in target)) {
      target[key] = value;
      changed = true;
    } else if (isPlainObject(value) && isPlainObject(target[key])) {
      changed = fillMissing(target[key], value) || changed;
    }
  }
  return changed;
}

function pruneExtra(target, reference) {
  let changed = false;
  for (const key of Object.keys(target)) {
    if (!(key in reference)) {
      delete target[key];
      changed = true;
    } else if (isPlainObject(target[key]) && isPlainObject(reference[key])) {
      changed = pruneExtra(target[key], reference[key]) || changed;
    }
  }
  return changed;
}

for (const file of readdirSync(localesDir).filter((f) => f.endsWith(".json"))) {
  const locale = file.replace(/\.json$/, "");
  if (LOCALES.includes(locale)) continue;
  const path = join(localesDir, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  let changed = fillMissing(data, merged.en);
  changed = pruneExtra(data, merged.en) || changed;
  if (changed) {
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  }
}

// Chaves estáticas usadas no código precisam existir no inglês.
const en = merged.en;
const keyExists = (key) => {
  let node = en;
  for (const part of key.split(".")) {
    if (!isPlainObject(node) || !(part in node)) return false;
    node = node[part];
  }
  return typeof node === "string";
};

const usedKeys = new Map();
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "fragments" || entry.name === "locales") continue;
      walk(full);
    } else if (/\.(tsx|ts)$/.test(entry.name) && !/\.(test|stories)\./.test(entry.name)) {
      const text = readFileSync(full, "utf8");
      for (const match of text.matchAll(/\bt\(\s*["'`]([A-Za-z0-9_.-]+)["'`]/g)) {
        if (!usedKeys.has(match[1])) usedKeys.set(match[1], full);
      }
    }
  }
};
if (existsSync(srcDir)) walk(srcDir);

for (const [key, file] of usedKeys) {
  if (!keyExists(key)) errors.push(`${file}: chave t("${key}") não existe em en`);
}

if (errors.length > 0) {
  console.error(`build-locales: ${errors.length} erro(s):\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`build-locales: ${fragments.length} fragmento(s), ${usedKeys.size} chave(s) usada(s) conferidas.`);
