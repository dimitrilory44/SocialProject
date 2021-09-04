const express = require('express');
const routes = express.Router();

const postCtrl = require('../controllers/post');

// création d'un post
routes.post('/', postCtrl.createPost);

// Affichage de tous les posts
routes.get('/', postCtrl.getAllPost);

// Affichage d'un post
routes.get('/:id', postCtrl.getOnePost);

// Modification d'un post
routes.put('/:id', postCtrl.updatePost);

// Suppression d'un post
routes.delete('/:id', postCtrl.deletePost);

// creation d'un commentaire
routes.post('/:id/comments', postCtrl.createComment);

module.exports = routes;