const db = require('../model/db');

exports.addDocument = (req, res) => {
  const { projectId, name, url } = req.body;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ message: 'Projeto não encontrado' });
  }
  const document = {
    id: db.documents.length + 1,
    projectId,
    name,
    url
  };
  db.documents.push(document);
  project.documents.push(document.id);
  res.status(201).json({ message: 'Documento adicionado', document });
};

exports.getDocumentsByProject = (req, res) => {
  const projectId = parseInt(req.params.projectId);
  const documents = db.documents.filter(d => d.projectId === projectId);
  res.json(documents);
};
