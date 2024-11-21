import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintRecommended from '@eslint/js';

export default [
        {
            ...eslintRecommended.configs.recommended,
            "ignores":["/*", "!/src/"],
            "files": [
                "*.ts",
                "*.tsx"
            ], // For TypeScript files
            "settings": {
                "react": {
                    "version": "detect" // Automatically detect the React version
                }
            },
            languageOptions: {
              parser: tsParser, // Use TypeScript parser
              parserOptions: {
                  "requireConfigFile": false,
                  "ecmaVersion": 2022,
                  "sourceType": "module",
                  "ecmaFeatures": {
                    "jsx": true
                  }
              },
              globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                jest: 'readonly',
              },
            },
            "plugins":{
                react: reactPlugin,
                '@typescript-eslint': tsPlugin, // Register the plugin
                "react-hooks": reactHooksPlugin,
                "react-refresh": reactRefreshPlugin,
            },
            "rules": {
                ...reactPlugin.configs.recommended.rules,
                ...tsPlugin.configs.recommended.rules,
                ...reactHooksPlugin.configs.recommended.rules,
                "react/react-in-jsx-scope": "off",
                "react/prop-types": "off",
                "no-extra-boolean-cast": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-empty-function": "warn"
            }
        },
      ];

  
    // Your other ESLint configuration
    // "ignorePatterns": ["/*", "!/src/"], // Ignore everything except the src folder
    // "globals": {
    //     "process": true
    // },
    // "settings": {
    //     "react": {
    //         "version": "detect" // Automatically detect the React version
    //     }
    // },
    // "env": {
    //   "browser": true,
    //   "es2021": true,
    //   "jest": true
    // },
    // "parserOptions": {
    //   "requireConfigFile": false,
    //   "ecmaVersion": 2022,
    //   "sourceType": "module",
    //   "ecmaFeatures": {
    //     "jsx": true
    //   }
    // },
    // "overrides": 