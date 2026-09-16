# Vitest – Instalação e Configuração Completa no repositório `shared`

Este documento descreve **passo a passo**, no padrão profissional de mercado, como instalar, configurar e estruturar **Vitest** no repositório **shared**, responsável por schemas Zod, DTOs, tipos e validações compartilhadas entre frontend e backend.

---

## 🎯 Objetivo

- Garantir que **regras de negócio (Zod)** sejam testadas na origem
- Evitar regressões silenciosas no front e no back
- Tratar o `shared` como uma **biblioteca independente**
- Possibilitar CI/CD confiável

---

## 📦 Estrutura esperada do repositório

```text
shared/
├── src/
│   ├── schemas/
│   │   └── user.schema.ts
│   └── index.ts
├── tests/
│   └── schemas/
│       └── user.schema.spec.ts
├── dist/
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── vitest_install_and_config.md
```

---

## 1️⃣ Instalar dependências

Dentro do diretório `shared`:

```bash
npm install -D vitest typescript
```

> 📌 **Vitest é sempre `devDependency`**

---

## 2️⃣ Configurar `package.json`

Exemplo completo:

```json
{
  "name": "@lib/shared",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "test:watch": "vitest --watch"
  },
  "dependencies": {
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vitest": "^1.4.0"
  }
}
```

---

## 3️⃣ Configurar TypeScript (`tsconfig.json`)

Configuração recomendada para biblioteca compartilhada:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

## 4️⃣ Criar configuração do Vitest

Crie o arquivo `vitest.config.ts` na raiz do `shared`:

```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    fileParallelism: false,
    include: ['tests/**/*.{spec,test}.ts'],
    testTimeout: 10000,
    coverage: {
      reportsDirectory: './coverage',
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        // Ignora arquivos de teste
        '**/*.test.ts',
        '**/*.spec.ts',

        // Ignora arquivos de configuração e tipos
        '**/types/**',
        '**/*.d.ts',
        '**/*.@types.ts',
        '**/prisma/**',
        '**/node_modules/**',
        '**/dist/**',

        // Ignora arquivos e pastas de mocks e utilitários de testes
        '**/*.mock.ts',
        '**/*.mocks.ts',
        '**/mocks/**',
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/__test-utils__/**',
        '**/*.test-util.ts',
      ],
    },
  },
  resolve: {
    alias: {
      // Permite usar @/ como atalho para a pasta src
      // Exemplo: import Button from '@/components/Button'
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

---

## 5️⃣ Criar um schema Zod de exemplo

`src/schemas/user.schema.ts`

```ts
import { z } from '../../lib/registry';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
```

---

## 6️⃣ Criar teste para o schema

`tests/schemas/user.schema.spec.ts`

```ts
import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../../src/schemas/user.schema';

describe('createUserSchema', () => {
  it('deve aceitar dados válidos', () => {
    const result = createUserSchema.safeParse({
      name: 'test',
      email: 'test@user.com',
      password: 'Password1',
    });

    expect(result.success).toBe(true);
  });

  it('deve rejeitar email inválido', () => {
    const result = createUserSchema.safeParse({
      name: 'test',
      email: 'email_invalido',
      password: 'Password1',
    });

    expect(result.success).toBe(false);
  });
});
```

---

## 7️⃣ Rodar os testes

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

---

## 8️⃣ Boas práticas recomendadas

✔ Testar **todas as regras de Zod**
✔ Testar apenas **comportamento**, não implementação
✔ Um arquivo de teste por schema
✔ Não usar mocks (Zod é determinístico)
✔ Manter testes rápidos (<50ms)

---

## 🧠 Conclusão

- O `shared` é uma **lib independente**
- Zod **deve** ser testado
- Vitest no shared é **boa prática de mercado**
- Isso aumenta confiabilidade, qualidade e velocidade

---

✅ Setup completo e profissional.
