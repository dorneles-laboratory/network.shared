<a id="readme-top"></a>

<div align="center">

![Status](https://img.shields.io/badge/status-pronto--para--uso-success?style=for-the-badge)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7B93E)
![Husky](https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=husky&logoColor=white)

</div>

<h1 align="center">
    
  Shared - Biblioteca de Tipos e Contratos Compartilhados
</h1>

<p align="center">
  Uma solução para projetos polyrepo.
  <br />
  <a href="https://github.com/dorneles-laboratory/network.shared"><strong>Explore os Arquivos »</strong></a>
  <br />
  <br />
  <a href="#começando-ambiente-e-instalacao">Baixe, Configure e Execute</a>
  ·
  <a href="https://github.com/dorneles-laboratory/network.shared/issues/new?template=bug-report-%F0%9F%90%9B.md">Reportar Bug</a>
  ·
  <a href="https://github.com/dorneles-laboratory/network.shared/issues/new?template=feature-request-%E2%9C%A8.md">Sugerir Melhoria</a>
</p>

<a id="visao-geral-do-projeto"></a>

## 🔎 Visão Geral do Projeto

Este repositório tem como objetivo centralizar código compartilhado entre diferentes partes de uma aplicação full stack, garantindo padronização, reutilização e segurança de tipos em todo o ecossistema.

Ele funciona como um pacote shared que pode ser consumido tanto pelo backend quanto pelo frontend.

---

<details open>
  <summary>📚 Tabela de Conteúdos</summary>
  <ol>
    <li><a href="#visao-geral-do-projeto">Visão Geral do Projeto</a></li>
    <li><a href="#objetivos-principais">Objetivos Principais</a></li>
    <li><a href="#stack-de-tecnologias">Stack de Tecnologias</a></li>
    <li><a href="#começando-ambiente-e-instalacao">Começando: Ambiente e Instalação</a></li>
        <ol>
            <li><a href="#pre-requisitos-do-sistema">Pré-requisitos do Sistema</a></li>
            <li><a href="#guia-de-instalacao-e-configuracao">Guia de Instalação e Configuração</a></li>
        </ol>
    </li>
    <li><a href="#comunidade-e-contribuicao">Comunidade e Contribuição</a></li> 
        <ol>
            <li><a href="#como-contribuir">Como Contribuir</a></li>
        </ol>
    <li><a href="#licenca">Licença</a></li>
    <li><a href="#autores">Autores</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>

---

<a id="objetivos-principais"></a>

## 🎯 Objetivos principais

- 🔁 **Evitar duplicação de regras**
- 🧠 **Centralizar validações e contratos**
- 🔐 **Garantir consistência entre front e back**
- 🧩 **Facilitar manutenção e evolução do sistema**
- 📐 **Forçar padrões de domínio**

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<a id="stack-de-tecnologias"></a>

## 🖥️ Stack de Tecnologias

A escolha da stack tecnológica foi orientada pela busca de robustez, escalabilidade e um ecossistema de desenvolvimento moderno.

<div align="center">

| Categoria                   | Tecnologia                                                                                                                                                                                                                   |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core & Linguagem**        | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Validação & Contratos**   | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)                                                                                                                                 |
| **Testes**                  | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)                                                                                                                        |
| **Qualidade de Código**     | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7B93E)           |
| **Automação & Padrões**     | ![Husky](https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=husky&logoColor=white)                                                                                                                            |
| **Distribuição (opcional)** | ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                 |

</div>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<a id="começando-ambiente-e-instalacao"></a>

## ⚙️ Começando: Ambiente e Instalação

Esta seção fornece um guia detalhado e passo a passo para configurar o ambiente de desenvolvimento e executar o projeto localmente.

<a id="pre-requisitos-do-sistema"></a>

### Pré-requisitos do Sistema

Antes de iniciar, certifique-se de que seu sistema atende aos seguintes requisitos. A verificação prévia desses itens evita falhas de instalação e economiza tempo de depuração.

<div align="center">

**À DESENVOLVER**

</div>

<a id="guia-de-instalacao-e-configuracao"></a>

### Guia de Instalação e Configuração

#### 🚀 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com/install/) (para clonar o repositório)

<div align="center">

**À DESENVOLVER O PASSO A PASSO**

</div>

<a id="comunidade-e-contribuicao"></a>

## ➕ Comunidade e Contribuição

Este projeto prospera com a colaboração. Agradecemos e incentivamos contribuições da equipe deste projeto.

<a id="como-contribuir"></a>

### Como Contribuir

Estamos abertos a todos os tipos de contribuições, desde correções de bugs e melhorias na documentação até o desenvolvimento de novas functionalities. Para garantir um processo organizado, siga o fluxo de trabalho abaixo:

1.  **Fork o Repositório:** Crie uma cópia do projeto em sua própria conta do GitHub.
2.  **Crie uma Branch:** Crie uma branch descritiva para sua alteração (`git checkout -b feature/nova-funcionalidade` ou `git checkout -b fix/correcao-bug`).
3.  **Faça suas Alterações:** Implemente seu código, seguindo os padrões e a arquitetura do projeto.
4.  **Commit suas Alterações:** Faça commits atômicos e com mensagens claras (`git commit -m 'feat: Adiciona funcionalidade X'`).
5.  **Push para a Branch:** Envie suas alterações para o seu fork (`git push origin feature/nova-funcionalidade`).
6.  **Abra um Pull Request:** Crie um Pull Request (PR) para a branch `development` do repositório original, detalhando as alterações que você fez.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<a id="licenca"></a>

## 📝 Licença

Distribuído sob a Apache License. Veja o arquivo `LICENSE` para mais detalhes.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<a id="autores"></a>

## 🎓 Autores:

1.

- **Nome:** Fernando Dorneles da Silva
- **Título:** Graduando em Engenharia de Computação
- **E-mail:** fernando.dorneles@ecomp.ufsm.br
- **GitHub:** [dornelesfernando](https://github.com/dornelesfernando)
- **LinkedIn:** [Fernando Dorneles da Silva](https://www.linkedin.com/in/fernandodorneles)
- **Currículo Lattes:** [Acessar Lattes](http://lattes.cnpq.br/0532418852427960)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<a id="agradecimentos"></a>

## 🤝 Agradecimentos

Este projeto não seria possível sem o incrível trabalho das equipes por trás das seguintes tecnologias e a ajuda inestimável da comunidade de desenvolvimento. Um agradecimento especial a:

### Comunidades

- **[Stack Overflow](https://stackoverflow.com/):** Pela sabedoria coletiva que resolveu inúmeros desafios ao longo do caminho.
- **[MDN Web Docs](https://developer.mozilla.org/):** Pela documentação clara e completa sobre tecnologias da web.
- **[Tau Rocket Team](https://www.instagram.com/taurocketteam/):** Pela oportunidade e apoio ao projeto.

- E, em especial, à minha equipe de desenvolvimento.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>
