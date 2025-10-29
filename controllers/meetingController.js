const db = require('../model/db');

exports.scheduleMeeting = (req, res) => {
  const { projectId, date, notes } = req.body;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ message: 'Projeto não encontrado' });
  }
  const meeting = {
    id: db.meetings.length + 1,
    projectId,
    date,
    notes
  };
  db.meetings.push(meeting);
  project.meetings.push(meeting.id);
  res.status(201).json({ message: 'Reunião agendada', meeting });
};

exports.getMeetingsByProject = (req, res) => {
  const projectId = parseInt(req.params.projectId);
  const meetings = db.meetings.filter(m => m.projectId === projectId);
  res.json(meetings);
};
