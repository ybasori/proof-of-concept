import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintRecommended from "@eslint/js";
import tseslint from 'typescript-eslint'


export default tseslint.config(
  { ignores: ["/*", "!/src/"] },
  {
    extends: [eslintRecommended.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin, // Register the plugin
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-extra-boolean-cast": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "warn",
    },
  }
);
