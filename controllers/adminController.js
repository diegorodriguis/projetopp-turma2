
const db = require('../model/db');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../service/authMiddleware');

exports.registerAdmin = (req, res) => {
  const { username, password, email } = req.body;
  if (db.admins.find(a => a.username === username || a.email === email)) {
    return res.status(409).json({ message: 'Administrador já existe' });
  }
  const admin = { id: db.admins.length + 1, username, password, email };
  db.admins.push(admin);
  res.status(201).json({ message: 'Administrador registrado', admin });
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;
  const admin = db.admins.find(a => a.username === username && a.password === password);
  if (!admin) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY, { expiresIn: '8h' });
  res.json({ token });
};

exports.deleteAdmin = (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.admins.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Administrador não encontrado' });
  }
  db.admins.splice(index, 1);
  res.json({ message: 'Administrador excluído com sucesso' });
};
