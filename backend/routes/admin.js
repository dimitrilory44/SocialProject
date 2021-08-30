const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

// recupération de tous les utilisateur pour la partie administration
router.get('/', adminCtrl.getAllUsers);

// Gestion de profil
router.get('/:id', adminCtrl.getOneUser);

// Post par utilisateur
router.get('/:id/posts', adminCtrl.getPostByUser)

module.exports = router;