export default {
  locales: [
    "en",
    "pt-BR"
  ],
  extract: {
    input: [
      "src/components/coordinator/**/*.{ts,tsx}",
      "src/components/cases/**/*.{ts,tsx}",
      "src/components/new-agent/**/*.{ts,tsx}",
      "src/components/issue-output/**/*.{ts,tsx}",
      "src/components/issue-properties/**/*.{ts,tsx}",
      "src/components/chat/**/*.{ts,tsx}",
      "src/pages/CoordinatorTaskViews.tsx"
    ],
    output: "src/i18n/locales/{{language}}.json"
  }
}
