const db = require('../model/db');

exports.addUpdate = (req, res) => {
  const { projectId, image, document, note } = req.body;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ message: 'Projeto não encontrado' });
  }
  const update = {
    id: db.updates.length + 1,
    projectId,
    image,
    document,
    note,
    date: new Date()
  };
  db.updates.push(update);
  project.updates.push(update.id);
  res.status(201).json({ message: 'Atualização registrada', update });
};

exports.getUpdatesByProject = (req, res) => {
  const projectId = parseInt(req.params.projectId);
  const updates = db.updates.filter(u => u.projectId === projectId);
  res.json(updates);
};

exports.deleteUpdate = (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.updates.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Atualização não encontrada' });
  }
  // Remover referência do projeto
  const update = db.updates[index];
  const project = db.projects.find(p => p.updates && p.updates.includes(id));
  if (project) {
    project.updates = project.updates.filter(updId => updId !== id);
  }
  db.updates.splice(index, 1);
  res.json({ message: 'Atualização excluída com sucesso' });
};
