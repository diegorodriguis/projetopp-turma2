require('dotenv').config();
const request = require('supertest');
const { faker } = require('@faker-js/faker');

/**
 * Cria um novo cliente
 */
async function registrarCliente() {
  const email = `teste_${Date.now()}@exemplo.com`;
  const password = '12345678';
  const name = faker.internet.username();

  const resposta = await request(process.env.BASE_URL)
    .post('/client/register')
    .set('Content-Type', 'application/json')
    .send({ name, email, password });

  return resposta.body.client;
}

async function registrarAdmin() {
  const email = `admin_${Date.now()}@exemplo.com`;
  const password = '12345678';
  const username = faker.internet.username();

  const resposta = await request(process.env.BASE_URL)
    .post('/admin/register')
    .set('Content-Type', 'application/json')
    .send({ username, email, password });

  return resposta.body.admin;
}

/**
 * Faz login e retorna o token
 */
async function logarCliente({ email, password }) {
  const resposta = await request(process.env.BASE_URL)
    .post('/client/login')
    .set('Content-Type', 'application/json')
    .send({ email, password });

  return resposta.body.token;
}

/**
 * Cria cliente + login automático
 */
async function criarClienteDeTeste() {
  const email = `teste_${Date.now()}@exemplo.com`;
  const password = '12345678';
  const name = 'Cliente Teste';

  const cliente = await registrarCliente({ name, email, password });
  const token = await logarCliente({ email, password });

  return {
    clientId: cliente.id,
    token,
    email,
    password,
  };
}

/**
 * Cria um projeto para um cliente já existente
 * @param {string} baseUrl - URL da API
 * @param {number} clientId - ID do cliente
 * @param {string} token - token do cliente
 * @param {string} nomeProjeto - nome do projeto (opcional)
 * @returns {object} - resposta da criação do projeto
 */
async function criarProjetoParaCliente({ baseUrl, clientId, token, nomeProjeto = 'Projeto Teste' }) {
  const resposta = await request(baseUrl)
    .post('/project')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      clientId,
      name: nomeProjeto,
      stages: ['Levantamento de informações']
    });

  return resposta.body.project;
}

async function criarAtualizacaoParaProjeto({ baseUrl, projetoId, token }) {
  const resposta = await request(baseUrl)
    .post('/update')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      projectId: projetoId,
      image: '/uploads/projeto1/fachada_inicial.jpg',
      document: '/docs/projeto1/briefing.pdf',
      note: 'Briefing com cliente concluído. Definidas expectativas e estilo do projeto.'
    });

  return resposta.body.update;
}

async function criarDocumentoParaProjeto({ baseUrl, projetoId, token }) {
  const resposta = await request(baseUrl)
    .post('/document')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      projectId: projetoId,
      name: '/docs/projeto1/planta_baixa.pdf',
      url: 'Planta baixa aprovada pelo cliente.'
    });

  return resposta.body.document;
}

/**
 * Gera dados fake para admin
 */
async function gerarAdminFake() {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: '12345678'
  };
}

async function gerarClienteFake() {
  return {
    email: faker.internet.email(),
    password: '12345678'
  };
}
module.exports = {
    registrarCliente,
    logarCliente,
    criarClienteDeTeste,
    gerarAdminFake,
    gerarClienteFake,
    criarProjetoParaCliente,
    registrarAdmin,
    criarAtualizacaoParaProjeto,
    criarDocumentoParaProjeto
};

