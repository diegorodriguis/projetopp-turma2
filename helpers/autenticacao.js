import request from 'supertest';

const obterToken = async (email, password) => {
    // Lógica para obter o token de autenticação
     const respostaLogin = await request(process.env.BASE_URL)
        .post('/client/login')
        .set('Content-Type', 'application/json')
        .send({ email, password });
    
     return respostaLogin.body.token;
}

module.exports = {
    obterToken
};