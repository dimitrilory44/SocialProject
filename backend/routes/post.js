const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

// Créer un Post
router.post('/', postCtrl.newPost);

// Afficher tous les posts
router.get('/', postCtrl.getAllPosts);

// Afficher un post
// Modifier un post
// Supprimer un post

module.exports = router;