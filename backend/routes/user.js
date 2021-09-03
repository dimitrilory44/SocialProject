const express = require('express');
const routes = express.Router();

const userCtrl = require('../controllers/user');

// Information tous les utilisateurs
routes.get('/', userCtrl.getAllUser);

// Information 1 utilisateur
routes.get('/:id', userCtrl.getOneUser);

module.exports = routes;