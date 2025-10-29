const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/', updateController.addUpdate);
router.get('/project/:projectId', updateController.getUpdatesByProject);

module.exports = router;
