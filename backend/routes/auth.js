const express = require('express');
const routes = express.Router();
const max_auth = require('../middleware/limit-auth');

const authCtrl = require('../controllers/auth');

// signup d'un utilisateur
routes.post('/signup', authCtrl.signup);

// login d'un utilisateur
routes.post('/login', max_auth.limiter, authCtrl.login);

module.exports = routes;