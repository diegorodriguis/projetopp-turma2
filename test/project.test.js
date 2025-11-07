const request = require('supertest');
const { expect } = require('chai');
const { criarClienteDeTeste, criarProjetoParaCliente, criarAtualizacaoParaProjeto, criarDocumentoParaProjeto } = require('../helpers/testUtils.js');
require('dotenv').config();

describe('Project', () => {
    describe('POST /login', () => {
        let clientId;
        let token;
        let projetoId;
        let updateId;
        let documentoId;

        before(async () => {
            const cliente = await criarClienteDeTeste();
            const projeto = await criarProjetoParaCliente({  
            baseUrl: process.env.BASE_URL,
            clientId: cliente.clientId,
            token: cliente.token
        });
            const update = await criarAtualizacaoParaProjeto({
                baseUrl: process.env.BASE_URL,
                projetoId: projeto.id,
                token: cliente.token
            });
            const documento = await criarDocumentoParaProjeto({
                baseUrl: process.env.BASE_URL,
                projetoId: projeto.id,
                token: cliente.token
            });

            clientId = cliente.clientId;
            token = cliente.token;
            projetoId = projeto.id;
            updateId = update.id;
            documentoId = documento.id;
    });

        it('Deve retornar 201 e um id para credenciais válidas ao cadastrar um projeto', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/project')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'clientId': clientId,
                    'name': 'Residência Jardim Europa',
                    'stages': ['Levantamento de informações']
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('message');
            expect(resposta.body.message).to.be.a('string');
            expect(resposta.body.project.id).to.be.a('number');

        });

         it('Deve retornar 200 ao pesquisar um projeto existente por clientId', async () => {        
            const resposta = await request(process.env.BASE_URL)
                .get(`/project/client/${clientId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array').that.is.not.empty;

            const projeto = resposta.body[0];
            expect(projeto.clientId).to.equal(clientId);
            expect(projeto.name).to.equal('Projeto Teste');
        });

        it('Deve retornar 200 ao pesquisar um projeto pelo id', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get(`/project/progress/${projetoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('object');
            expect(resposta.body.id).to.equal(projetoId);
        });

        it('Deve retornar 201 ao realizar update de um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/update')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'projectId': projetoId,
                    'image': '/uploads/projeto1/fachada_inicial.jpg',
                    'document': '/docs/projeto1/briefing.pdf',
                    'note': 'Briefing com cliente concluído. Definidas expectativas e estilo do projeto.'
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('message').that.includes('Atualização registrada');
            expect(resposta.body.update).to.have.property('id');
            expect(resposta.body.update.id).to.be.a('number');

        });

        it('Deve retornar 200 ao buscar atualizações de um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get(`/update/project/${projetoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array').that.is.not.empty;

            const update = resposta.body[0];
            expect(update).to.have.property('projectId').that.equals(projetoId);
        });

        it('Deve excluir uma atualizacao de um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete(`/update/${updateId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message').that.includes('Atualização excluída com sucesso');

        });

        it('Deve retornar 201 ao cadastrar um documento para um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/document')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'projectId': projetoId,
                    'name': '/docs/projeto1/planta_baixa.pdf',
                    'url': 'Planta baixa aprovada pelo cliente.'
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('message').that.includes('Documento adicionado');
            expect(resposta.body.document).to.have.property('id');
            expect(resposta.body.document.id).to.be.a('number');
        });

        it('Deve retornar 200 ao buscar documentos de um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get(`/document/project/${projetoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array').that.is.not.empty;

        });
        it('Deve excluir um documento de um projeto existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete(`/document/${documentoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message').that.includes('Documento excluído com sucesso');  

        });

    });

});