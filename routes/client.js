const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/register', clientController.registerClient);
router.post('/login', clientController.loginClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);

module.exports = router;
