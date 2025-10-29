# API de Acompanhamento de Projetos de Arquitetura

## Descrição
API REST para registro, acompanhamento e gerenciamento de projetos de arquitetura, clientes, reuniões, atualizações e documentos. Permite o controle do progresso dos projetos, agenda de reuniões, galeria de atualizações e acesso a documentos.

## Funcionalidades
- Registro e login de administradores
- Registro e login de clientes
- Busca de clientes e dados de clientes
- Cadastro e gerenciamento de projetos vinculados a clientes
- Consulta de andamento de projeto (percentual de conclusão, etapas, prazos)
- Registro e consulta de reuniões agendadas
- Registro e consulta de atualizações do projeto (fotos, documentos, observações)
- Gerenciamento de documentos do projeto

## Autenticação
- Administradores têm acesso total à API
- Clientes têm acesso restrito ao painel do seu projeto, agenda, galeria de atualizações e documentos
- Autenticação via JWT (Bearer Token) implementada como middleware

## Documentação Swagger
A documentação completa dos endpoints está disponível em `/swagger` após iniciar o servidor.
O arquivo Swagger está em `resources/swagger.json`.

## Estrutura do Projeto
- `routes/` - Rotas da API
- `controllers/` - Lógica dos endpoints
- `service/` - Serviços e middlewares (ex: autenticação)
- `model/` - Modelos e banco de dados em memória
- `resources/` - Documentação Swagger

## Como executar
1. Instale as dependências:
   ```bash
   npm install express body-parser swagger-ui-express jsonwebtoken
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.
- Para autenticação, utilize o token JWT retornado nos endpoints de login.
