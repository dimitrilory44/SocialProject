const db = require('../models/db.config');

// Ne fonctionne pas
exports.newPost = (req, res) => {
    db.query(`INSERT INTO post(titre, image, contenu, id_users) VALUES('${req.body.titre}', '${req.body.image}', '${req.body.contenu}', '${req.body.userId}')`, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Post crée !'});
    });
};

exports.getAllPosts = (req, res) => {
    db.query('SELECT user.nom, user.prenom, user.image as avatar, idpost, titre, post.image, post.contenu, post.createdAt, post.isLike, post.createdAt FROM post INNER JOIN user ON post.id_users = user.iduser ORDER BY post.createdAt DESC', (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};