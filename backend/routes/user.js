const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// signup d'un utilisateur
router.post('/signup', userCtrl.signup);

// login d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;