# 🛒 Loja Virtual - Backend

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/JoaoSBarbosa/loja-backend/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-v10-%23E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-%232496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-%23007ACC?style=flat-square&logo=typeorm&logoColor=white)](https://typeorm.io/)

---

## 📖 Sobre o projeto

Este repositório contém o **backend** de uma aplicação de loja virtual construída com **NestJS**, **PostgreSQL** e arquitetura baseada em boas práticas como modularização, SOLID e DDD.

O foco principal é **aprender e aplicar NestJS em ambiente de produção**, contemplando:

- Estrutura modular organizada e escalável
- CRUDs robustos com validação via DTOs e `class-validator`
- Autenticação JWT segura
- Persistência com banco PostgreSQL via TypeORM
- Containerização usando Docker e Docker Compose



<p align="center">
  <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer" style="margin-right:20px;">
    <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" height="60" />
  </a>
  <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style="margin-right:20px;">
    <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="Docker" height="60" />
  </a>
  <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" height="60" />
  </a>
</p>


## 📁 Estrutura do Projeto (inicial)

```

backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── user/
│   ├── cliente/
│   ├── categoria/
│   ├── produto/
│   ├── venda/
│   ├── item-venda/
│   └── auth/
├── .env
├── Dockerfile
├── docker-compose.yml
└── README.md

````

> A estrutura é organizada por **módulos de domínio**, cada um contendo suas entidades, controllers, serviços e DTOs.

---

## 🛠️ Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [Docker](https://www.docker.com/) instalado

---

## ▶️ Rodando localmente (sem Docker)

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor em modo de desenvolvimento
npm run start:dev
````

---

## 🐳 Rodando com Docker

```bash
# Build da imagem Docker
docker build -t loja-backend .

# Rodar container
docker run -d -p 3000:3000 --env-file .env loja-backend
```

Também é possível subir o backend junto com o banco PostgreSQL usando Docker Compose.

---

## 🧪 Testes (planejados)

```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e
```

---

## ✅ Funcionalidades previstas

* [x] Estrutura inicial com NestJS
* [x] CRUD de usuários
* [ ] Autenticação com JWT
* [x] CRUD de clientes
* [x] CRUD de categorias
* [x] CRUD de produtos
* [x] Lançamento de vendas e itens de venda
* [x] Orquestração com Docker Compose e PostgreSQL
* [ ] Frontend Angular integrado (repositório separado)

---

## 📦 Frontend Angular

O frontend será desenvolvido em um projeto separado e consumirá esta API via REST.

---

## 📄 Licença

MIT License — uso livre para estudos e projetos pessoais 🚀

---

## 👨‍💻 Desenvolvedor

Feito com ❤️ por [João Barbosa](https://github.com/JoaoSBarbosa)
