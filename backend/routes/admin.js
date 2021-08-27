const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

// recupération de tous les utilisateur pour la partie administration
router.get('/', adminCtrl.getAllUsers);

module.exports = router;