const express = require('express');
const routes = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

// Information tous les utilisateurs
routes.get('/', userCtrl.getAllUser);

// Information 1 utilisateur
routes.get('/:id', userCtrl.getOneUser);

// Modifier information utilisateur
routes.put('/:id', multer, userCtrl.updateUser);

// Supprimer 1 utilisateur
routes.delete('/:id', userCtrl.deleteUser);

// Post par utilisateur
routes.get('/:id/posts', userCtrl.getPostByUser);

module.exports = routes;