# Prettier — Instalação e Configuração

Este documento descreve como instalar e configurar o **Prettier** para padronização de código em projetos JavaScript e TypeScript, seguindo boas práticas de mercado.

---

## 📦 1. Instalação

Instale o Prettier como dependência de desenvolvimento:

```bash
npm install -D prettier
```

---

## ⚙️ 2. Criar arquivo de configuração

Na raiz do projeto, crie o arquivo `.prettierrc.json`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Descrição das principais opções

| Opção           | Descrição                                  |
| --------------- | ------------------------------------------ |
| `semi`          | Usa ponto e vírgula                        |
| `singleQuote`   | Usa aspas simples                          |
| `trailingComma` | Vírgula no final de listas                 |
| `printWidth`    | Largura máxima da linha                    |
| `tabWidth`      | Tamanho da indentação                      |
| `endOfLine`     | Padroniza quebra de linha (Linux/macOS/CI) |

---

## 🚫 3. Ignorar arquivos

Crie o arquivo `.prettierignore` para evitar formatação de arquivos gerados:

```txt
# Diretórios padrão do Node/Build
node_modules
dist
build

# Arquivos de Lock
package-lock.json
yarn.lock
pnpm-lock.yaml

# Arquivos do Git
.git
.gitignore

# Outros (como arquivos de log)
*.log

# Diretórios de ambiente
coverage
.env
.env.*
```

---

## 📜 4. Scripts no package.json

Adicione os scripts abaixo:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Uso

```bash
npm run format        # Formata o código
npm run format:check  # Verifica formatação (CI)
```

---

## ✅ 6. Boas práticas

- Execute `npm run format` antes de commits
- Use `npm run format:check` em pipelines CI
- Nunca misture regras de formatação no ESLint
- Prettier deve ser a única fonte de formatação

---

## 📌 7. Estrutura final esperada

```
project-root/
├── .prettierrc.json
├── .prettierignore
├── package.json
```
