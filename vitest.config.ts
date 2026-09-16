import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Define o ambiente de testes como node (perfeito para bibliotecas puras)
    environment: 'node',

    // Permite usar funções como `describe`, `it`, `expect` sem importar manualmente
    globals: true,

    // Desativa o paralelismo de arquivos para manter a execução previsível
    fileParallelism: false,

    // Define quais arquivos serão considerados testes
    include: ['tests/**/*.{spec,test}.ts'],

    // Tempo máximo para cada teste antes de falhar por timeout
    testTimeout: 10000,

    // Configuração de cobertura de testes
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
      // Atalho limpo para buscar o código fonte de dentro do próprio shared
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
