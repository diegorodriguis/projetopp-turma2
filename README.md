# 🏗️ API de Acompanhamento de Projetos de Arquitetura

<img src="https://cdn-icons-png.flaticon.com/512/3270/3270910.png" width="120" alt="Arquitetura API" align="right"/>

## 📋 Descrição
API REST para **registro, acompanhamento e gerenciamento de projetos de arquitetura**: clientes, reuniões, atualizações e documentos.

Permite controle de progresso, agendamento de reuniões, galeria de atualizações (fotos/observações) e acesso centralizado a documentos.

---

## 🚀 Principais Funcionalidades
- Registro e login de administradores e clientes
- Cadastro e gerenciamento de projetos
- Consulta de andamento do projeto
- Registro e consulta de reuniões
- Atualizações de projeto (fotos, observações, docs)
- Gerenciamento de documentos
- Exclusão de administradores, documentos e atualizações

---

## ⚙️ Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie o servidor:**
   ```bash
   npm start
   ```
3. **Acesse a documentação Swagger:**
   [http://localhost:3000/swagger](http://localhost:3000/swagger)

**Observação:** O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.

---

## 🧪 Testes automatizados

Execute todos os testes automatizados de API com:
```bash
npm test
```

---

## 📦 Dependências principais

- express
- jsonwebtoken
- swagger-ui-express

Para desenvolvimento/testes:
- mocha
- chai
- supertest
- @faker-js/faker

---

## 🔐 Autenticação

- **Administradores:** acesso total à API
- **Clientes:** acesso restrito ao próprio projeto, reuniões, galeria e documentos
- Implementação via **JWT (Bearer Token)**

---

## 🗂️ Estrutura do Projeto

```
projetopp-turma2/
├── app.js
├── controllers/
├── helpers/
├── model/
├── resources/
├── routes/
├── service/
└── test/
```

---

## 🧭 Principais rotas da API

### Autenticação/Admin
- `POST /admin/register` — Cadastro de administrador
- `POST /admin/login` — Login de administrador
- `DELETE /admin/:id` — Remove administrador

### Autenticação/Cliente
- `POST /client/register` — Cadastro de cliente
- `POST /client/login` — Login de cliente
- `GET /client/` — Lista clientes
- `GET /client/:id` — Detalhes do cliente

### Projetos
- `POST /project/` — Cria projeto
- `GET /project/client/:clientId` — Lista projetos de um cliente
- `GET /project/progress/:id` — Progresso do projeto

### Reuniões
- `POST /meeting/` — Agenda reunião
- `GET /meeting/project/:projectId` — Lista reuniões do projeto

### Atualizações
- `POST /update/` — Adiciona atualização
- `GET /update/project/:projectId` — Lista atualizações do projeto
- `DELETE /update/:id` — Remove atualização

### Documentos
- `POST /document/` — Adiciona documento
- `GET /document/project/:projectId` — Lista documentos do projeto
- `DELETE /document/:id` — Remove documento

---

## 🧭 Documentação Swagger

Acesse a documentação interativa em:
[http://localhost:3000/swagger](http://localhost:3000/swagger)

Arquivo de configuração: `resources/swagger.json`

---

## 🧩 Tecnologias

- Node.js
- Express.js
- Swagger UI
- JWT (JSON Web Token)

---

## 📬 Contato

Diego Rodrigues — diego.rodriguestti@gmail.com
[Seu Portfólio ou GitHub](https://github.com/diegorodriguis)