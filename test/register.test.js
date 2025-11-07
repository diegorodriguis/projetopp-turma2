const request = require('supertest');
const { expect } = require('chai');
const { gerarAdminFake, gerarClienteFake } = require('../helpers/testUtils.js');
require('dotenv').config();

describe('Register', () => {
    describe('POST /register', () => {
        it('Deve retornar 201 e um id para credenciais  válidas para admin', async () => {
            const adminData = await gerarAdminFake();

            const resposta = await request(process.env.BASE_URL)
                .post('/admin/register')
                .set('Content-Type', 'application/json')
                .send({
                    'username': adminData.username,
                    'email': adminData.email,
                    'password': adminData.password
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body.admin.id).to.be.a('number');
            expect(resposta.body.admin).to.have.property('id');
        });

        it('Deve retornar 201 e um id para credenciais válidas para cliente', async () => {
            const clienteData = await gerarClienteFake();

            const resposta = await request(process.env.BASE_URL)
                .post('/client/register')
                .set('Content-Type', 'application/json')
                .send({
                    'email': clienteData.email,
                    'password': clienteData.password
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body.client.id).to.be.a('number');
            expect(resposta.body.client).to.have.property('id');
        });
    });

});