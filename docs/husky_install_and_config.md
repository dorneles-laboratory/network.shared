# 🐶 Husky – Configuração no `shared`

Este documento descreve como instalar e configurar o **Husky** para garantir qualidade de código antes de cada commit.

---

## 📌 O que é o Husky?

O Husky permite executar scripts automaticamente em eventos do Git, como:

- `pre-commit`
- `pre-push`

Neste projeto, ele será usado para:

- Rodar o **ESLint**
- Rodar os **testes (Vitest)**
- Bloquear commits com erros

---

## ✅ Pré-requisitos

Antes de começar, verifique se:

- Node.js ≥ 18
- npm
- Git inicializado no repositório

Verificar se o Git está ativo:

```
git status
```

Se não estiver:

```
git init
```

---

## 📦 Instalação do Husky

Instale o Husky como dependência de desenvolvimento:

```
npm install -D husky
```

---

## ⚙️ Inicialização do Husky

Execute o comando abaixo:

```
npx husky init
```

Isso irá:

- Criar a pasta `.husky/`
- Criar o hook `.husky/pre-commit`
- Adicionar o script `prepare` no `package.json`

Exemplo do `package.json`:

```
"scripts": {
  "prepare": "husky"
}
```

⚠️ **Não remova o script `prepare`**, ele é obrigatório para o funcionamento do Husky.

---

## 🧪 Configurando o hook `pre-commit`

Abra o arquivo:

```
.husky/pre-commit
```

Conteúdo recomendado:

```
npm run lint
npm run format
npm run test
```

### O que isso faz?

- ❌ Bloqueia o commit se o ESLint falhar
- 🧹 Executa o Prettier no commit
- ❌ Bloqueia o commit se os testes falharem
- ✅ Só permite commit com código válido

---

## 📁 Estrutura esperada do projeto

```
shared/
├─ .husky/
│  ├─ _
│  └─ pre-commit
├─ eslint.config.js
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts
```
