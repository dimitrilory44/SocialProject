const db = require('../models');
const { Post } = db.sequelize.models;

exports.createPost = (req, res) => {
    Post.create({
        titre: req.body.titre,
        contenu: req.body.contenu,
        UserId: req.body.userId
    })
    .then(() => res.status(201).json({message: 'Post crée !'}))
    .catch(error => res.status(400).json(error));
};