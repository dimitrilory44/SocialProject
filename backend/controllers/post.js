const db = require('../models');
const { Post, Comment } = db.sequelize.models;

/*********************** POST ********************************/

exports.createPost = (req, res) => {
    const newPost = {
        titre: req.body.titre,
        contenu: req.body.contenu,
        UserId: req.body.userId
    }
    Post.create(newPost)
    .then(() => res.status(201).json({message: 'Post crée !'}))
    .catch(error => res.status(400).json(error));
};

exports.getAllPost = (req, res) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error));
};

exports.getOnePost = (req, res) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json(error));
};

exports.updatePost = (req, res) => {
    Post.update({
        titre: req.body.titre,
        contenu: req.body.contenu
    }, {
        where: {
            id: req.params.id,
            UserId: req.body.userId
        }
    })
    .then(() => res.status(201).json({message: 'Post modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deletePost = (req, res) => {
    Post.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({message: "Post supprimé !"}))
    .catch(error => res.status(400).json(error));
};

/*********************** COMMENT ********************************/

exports.createComment = (req, res) => {
    const newComment = {
        contenu: req.body.contenu,
        UserId: req.body.userId,
        PostId: req.params.id
    }
    Comment.create(newComment)
    .then(() => res.status(201).json({message: 'Commentaire crée !'}))
    .catch(error => res.status(400).json(error));
};