const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.createProject);
router.get('/client/:clientId', projectController.getProjectsByClient);
router.get('/progress/:id', projectController.getProjectProgress);

module.exports = router;
