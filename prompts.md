**Objetivo**
Criar uma API Rest para acompanhamento da progressão do projeto de casas, apartamentos entre outros serviços voltado para area de arquitetura.

**Contexto**
- A API possui as seguintes funcionalidades: registro de administradores, registro de clientes, busca de clientes, busca de dados de clientes, Cadastro e gerenciamento de projetos vinculados a clientes, Consulta de andamento de projeto (percentual de conclusão, etapas concluídas, próximas etapas, prazos etc.)., Registro e consulta de reuniões agendadas com o cliente e Registro de atualizações do projeto (fotos, documentos, observações de obra).
- Para que eu possa usar as funcionalidades, preciso fazer login como administrador
- O cliente, ao fazer login, terá acesso apenas: Ao painel do seu projeto (com o andamento atualizado da obra), À agenda de reuniões marcadas, À galeria de atualizações (imagens, relatórios, notas da equipe), A documentos disponibilizados (plantas, orçamentos, cronogramas etc.) e A progressão do projeto é feita por meio da comparação entre as etapas planejadas e as etapas já concluídas, permitindo visualizar o percentual de avanço e o status atual 

**Regras**
- Não me pergunte nada, só faça.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.