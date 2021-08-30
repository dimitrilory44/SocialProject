const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

/**************** POST ************************/

// Créer un post
router.post('/', postCtrl.newPost);

// Afficher tous les posts
router.get('/', postCtrl.getAllPosts);

// Afficher un post
router.get('/:id', postCtrl.getOnePost);

// Modifier un post
router.put('/:id', postCtrl.updatePost);

// Supprimer un post
router.delete('/:id', postCtrl.deletePost);

// liker un post
router.post('/:id/likes', postCtrl.likeOrNot);

// Recupérer les likes d'un post
router.get('/:id/likes', postCtrl.getLikesPost);

/**************** COMMENT *********************/

// Créer un commentaire
router.post('/:id/comments', postCtrl.newComment);

// Recupérer commentaire selon post
router.get('/:id/comments', postCtrl.getAllCommentPost);

// Modifier un commentaire
router.put('/:idPost/comments/:idComment', postCtrl.updateComment);

// Supprimer un commentaire
router.delete('/:idPost/comments/:idComment', postCtrl.deleteComment);

module.exports = router;