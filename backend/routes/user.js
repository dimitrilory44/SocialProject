const express = require('express');
const routes = express.Router();

const userCtrl = require('../controllers/user');

// Information tous les utilisateurs
routes.get('/', userCtrl.getAllUser);

// Information 1 utilisateur
routes.get('/:id', userCtrl.getOneUser);

// Post par utilisateur
routes.get('/:id/posts', userCtrl.getPostByUser);

// Supprimer 1 utilisateur
routes.delete('/:id', userCtrl.deleteUser);

module.exports = routes;