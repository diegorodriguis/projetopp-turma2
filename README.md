# 🏗️ API de Acompanhamento de Projetos de Arquitetura

<img src="https://cdn-icons-png.flaticon.com/512/3270/3270910.png" width="120" alt="Arquitetura API" align="right"/>

## 📋 Descrição
API REST para **registro, acompanhamento e gerenciamento de projetos de arquitetura**, incluindo clientes, reuniões, atualizações e documentos.

Ela permite o **controle do progresso de projetos**, **agendamento de reuniões**, **galeria de atualizações** (com fotos e observações) e **acesso a documentos** de forma centralizada e segura.

---

## 🚀 Funcionalidades Principais
- 👩‍💼 Registro e login de **administradores**
- 🧑‍💻 Registro e login de **clientes**
- 🔍 **Busca** de clientes e dados detalhados
- 🏗️ **Cadastro e gerenciamento de projetos** vinculados a clientes
- 📈 Consulta de **andamento do projeto** (percentual, etapas e prazos)
- 📅 **Registro e consulta de reuniões** agendadas
- 🖼️ **Atualizações de projeto** (fotos, observações, documentos)
- 📂 **Gerenciamento de documentos**
- ❌ Exclusão de administradores, documentos e atualizações

---

## 🔐 Autenticação
- **Administradores** → acesso total à API  
- **Clientes** → acesso restrito ao próprio projeto, reuniões, galeria e documentos  
- Implementação via **JWT (Bearer Token)** através de middleware

---

## 🧭 Documentação Swagger

A documentação completa dos endpoints está disponível em:

➡️ **[http://localhost:3000/swagger](http://localhost:3000/swagger)**  

O arquivo de configuração está localizado em:
resources/swagger.json

yaml
Copy code

📸 *Exemplo da interface Swagger:*
![Swagger UI Example](https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger_UI.png)

---

## 🗂️ Estrutura do Projeto
project-root/
│
├── routes/ # Definições das rotas da API
├── controllers/ # Lógica dos endpoints
├── service/ # Serviços e middlewares (ex: autenticação JWT)
├── model/ # Modelos e banco de dados em memória
└── resources/ # Documentação Swagger

yaml
Copy code

---

## ⚙️ Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install express body-parser swagger-ui-express jsonwebtoken
Inicie o servidor:

bash
Copy code
npm start
Acesse a documentação:
http://localhost:3000/swagger

💾 Observações
O banco de dados é em memória, portanto os dados são perdidos ao reiniciar o servidor.

Para autenticação, utilize o token JWT retornado nos endpoints de login.

🧱 Exemplo de Fluxo de Uso
🔐 Administrador faz login

🧾 Cadastra um cliente

🏗️ Cria um novo projeto vinculado

📅 Agenda reuniões e adiciona atualizações

🖼️ Cliente acessa seu painel e acompanha o progresso

🖼️ Prévia Visual (Sugestão)
Substitua por capturas reais do seu sistema.

Tela	Exemplo
Painel do Projeto	
Galeria de Atualizações	

🧩 Tecnologias Utilizadas
Node.js

Express.js

Swagger UI

JWT (JSON Web Token) para autenticação

Body-parser para tratamento de requisições

📬 Contato
📧 Seu Nome — seu.email@exemplo.com
🌐 Seu Portfólio ou GitHub