const express = require('express');
const routes = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

/**************** POST ************************/

// création d'un post
routes.post('/', multer, postCtrl.createPost);

// Affichage de tous les posts
routes.get('/', postCtrl.getAllPost);

// Affichage d'un post
routes.get('/:id', postCtrl.getOnePost);

// Modification d'un post
routes.put('/:id', multer, postCtrl.updatePost);

// Suppression d'un post
routes.delete('/:id', postCtrl.deletePost);

// liker un post
routes.post('/:id/likes', postCtrl.likeOrNot);

// Recupérer les likes d'un post
routes.get('/:id/likes', postCtrl.getLikesPost);

/**************** COMMENT *********************/

// creation d'un commentaire
routes.post('/:id/comments', postCtrl.createComment);

// Avoir tous les commentaires
routes.get('/:id/comments', postCtrl.getAllComment);

// Modifier un commentaire
routes.put('/:idPost/comments/:idComment', postCtrl.updateComment);

// Supprimer un commentaire
routes.delete('/:idPost/comments/:idComment', postCtrl.deleteComment);

module.exports = routes;