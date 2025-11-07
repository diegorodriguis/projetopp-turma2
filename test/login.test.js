const request = require('supertest');
const { expect } = require('chai');
const { registrarAdmin, registrarCliente } = require('../helpers/testUtils.js');
require('dotenv').config();

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 e um token para credenciais válidas para admin', async () => {
            const admin = await registrarAdmin();

            const resposta = await request(process.env.BASE_URL)
                .post('/admin/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': admin.username,
                    'email': admin.email,
                    'password': admin.password
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            expect(resposta.body).to.have.property('token');
        });

        // it('Deve retornar 200 e um token para credenciais válidas para cliente', async () => {
        //     const resposta = await request(process.env.BASE_URL)
        //         .post('/client/login')
        //         .set('Content-Type', 'application/json')
        //         .send({
        //             'email': 'eu@sandramaria.com.br',
        //             'password': '12345678'
        //         });

        //     expect(resposta.status).to.equal(200);
        //     expect(resposta.body.token).to.be.a('string');
        //     expect(resposta.body).to.have.property('token');
        // });

        it('Deve retornar 200 e um token para credenciais válidas para cliente', async () => {
            const cliente = await registrarCliente();

            const resposta = await request(process.env.BASE_URL)
                .post('/client/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': cliente.email,
                    'password': cliente.password
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('token');
            expect(resposta.body.token).to.be.a('string');
        });

    });

});