const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/', documentController.addDocument);
router.get('/project/:projectId', documentController.getDocumentsByProject);

module.exports = router;
