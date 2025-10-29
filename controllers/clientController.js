const db = require('../model/db');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../service/authMiddleware');

exports.registerClient = (req, res) => {
  const { name, email, password } = req.body;
  if (db.clients.find(c => c.email === email)) {
    return res.status(409).json({ message: 'Cliente já existe' });
  }
  const client = { id: db.clients.length + 1, name, email, password };
  db.clients.push(client);
  res.status(201).json({ message: 'Cliente registrado', client });
};

exports.loginClient = (req, res) => {
  const { email, password } = req.body;
  const client = db.clients.find(c => c.email === email && c.password === password);
  if (!client) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: client.id, role: 'client' }, SECRET_KEY, { expiresIn: '8h' });
  res.json({ token });
};

exports.getClients = (req, res) => {
  res.json(db.clients);
};

exports.getClientById = (req, res) => {
  const client = db.clients.find(c => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  res.json(client);
};
