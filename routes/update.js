const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');


router.post('/', updateController.addUpdate);
router.get('/project/:projectId', updateController.getUpdatesByProject);
router.delete('/:id', updateController.deleteUpdate);

module.exports = router;
