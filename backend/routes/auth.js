const express = require('express');
const routes = express.Router();

const authCtrl = require('../controllers/auth');

// signup d'un utilisateur
routes.post('/signup', authCtrl.signup);

// login d'un utilisateur
routes.post('/login', authCtrl.login);

module.exports = routes;