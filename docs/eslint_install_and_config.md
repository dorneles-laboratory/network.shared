# ESLint Setup — Shared Repository

Configuração de ESLint moderna (Flat Config) para o repositório **shared**, utilizada por backend e frontend.

Este setup é otimizado para:

- TypeScript
- Zod
- Vitest
- Libraries compartilhadas (shared)
- Padrões atuais de mercado

---

## 📦 Requisitos

- Node.js >= 18
- npm >= 9
- TypeScript configurado no projeto

---

## 🚀 Instalação

Instale as dependências necessárias:

```bash
npm install -D \
eslint \
@eslint/js \
typescript \
typescript-eslint \
prettier \
eslint-config-prettier \
eslint-plugin-prettier
eslint-plugin-vitest
```

---

## 🧱 Estrutura Esperada

```text
shared/
├─ src/
│  ├─ schemas/
│  └─ index.ts
├─ eslint.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## ⚙️ Configuração do ESLint (Flat Config)

Crie o arquivo eslint.config.js na raiz do projeto:

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vitest from 'eslint-plugin-vitest';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist', 'node_modules', 'build'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      vitest,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/consistent-type-imports': 'warn',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',

      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
    },
  },

  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

---

## 🧪 Integração com Vitest

Este setup reconhece automaticamente arquivos de teste:

- \*.test.ts
- \*.spec.ts

Regras específicas para testes:

- Permite any quando necessário
- Bloqueia .only
- Alerta sobre testes desativados

---

## 📜 Scripts

Adicione os scripts no package.json:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

## 🧠 Filosofia de Regras

Este ESLint foi pensado para libraries compartilhadas, portanto:

- ❌ Nada de regras específicas de framework
- ⚠️ any apenas quando inevitável
- ✅ Imports tipados consistentes
- 🧪 Testes mais flexíveis
- 🧹 Código limpo sem ruído excessivo

---

## 🔄 Uso Diário

Lintar o projeto:

```bash
npm run lint
```

Corrigir automaticamente:

```bash
npm run lint:fix
```
