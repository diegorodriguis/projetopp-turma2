const db = require('../model/db');

exports.createProject = (req, res) => {
  const { clientId, name, stages } = req.body;
  if (!db.clients.find(c => c.id === clientId)) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  const project = {
    id: db.projects.length + 1,
    clientId,
    name,
    stages: stages || [],
    completedStages: [],
    updates: [],
    documents: [],
    meetings: []
  };
  db.projects.push(project);
  res.status(201).json({ message: 'Projeto criado', project });
};

exports.getProjectsByClient = (req, res) => {
  const clientId = parseInt(req.params.clientId);
  const projects = db.projects.filter(p => p.clientId === clientId);
  res.json(projects);
};

exports.getProjectProgress = (req, res) => {
  const project = db.projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ message: 'Projeto não encontrado' });
  }
  const totalStages = project.stages.length;
  const completed = project.completedStages.length;
  const percent = totalStages ? Math.round((completed / totalStages) * 100) : 0;
  res.json({
    id: project.id,
    name: project.name,
    percentComplete: percent,
    completedStages: project.completedStages,
    nextStages: project.stages.filter(s => !project.completedStages.includes(s)),
    deadlines: project.stages.map(s => ({ stage: s, deadline: null })),
    status: percent === 100 ? 'Concluído' : 'Em andamento'
  });
};
