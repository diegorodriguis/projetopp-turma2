const request = require('supertest');
const { expect } = require('chai');
const { criarClienteDeTeste, criarProjetoParaCliente } = require('../helpers/testUtils.js');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

describe('Meeting', () => {
    let clientId;
    let token;
    let projetoId;

    before(async () => {
        const cliente = await criarClienteDeTeste();
        const projeto = await criarProjetoParaCliente({
            baseUrl: process.env.BASE_URL,
            clientId: cliente.clientId,
            token: cliente.token
        });
        clientId = cliente.clientId;
        token = cliente.token;
        projetoId = projeto.id;
    });
    describe('POST /meeting', () => {
        it('Deve retornar 201 quando uma reunião é criada com dados válidos', async () => {
            const dataFutura = faker.date.anytime();
            console.log('Data futura gerada para a reunião:', dataFutura);
            const resposta = await request(process.env.BASE_URL)
                .post('/meeting')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'projectId': projetoId,
                    'date': dataFutura,
                    'agenda': 'Discussão do progresso do projeto'
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body.meeting).to.have.property('id');
            expect(resposta.body.meeting.id).to.be.a('number');
        });

        it('Deve retornar 200 ao buscar reuniões de um projeto', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get(`/meeting/project/${projetoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        });

    });

});

