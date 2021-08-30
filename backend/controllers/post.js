const db = require('../models/db.config');

/**************** POST *******************/

exports.newPost = (req, res) => {
    db.query(`INSERT INTO post(titre, image, contenu, isLike, id_user) VALUES('${req.body.titre}', '${req.body.image}', '${req.body.contenu}', 0, '${req.body.userId}')`, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Post crée !'});
    });
};

exports.getAllPosts = (req, res) => {
    db.query(`
        SELECT user.nom, user.prenom, user.image as avatar, idpost, titre, post.image, post.contenu, post.createdAt, post.isLike
        FROM post 
        INNER JOIN user ON post.id_user = user.iduser 
        ORDER BY post.createdAt DESC`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        }
    );
};

exports.getOnePost = (req, res) => {
    db.query(`
        SELECT user.nom, user.prenom, user.image as avatar, idpost, titre, post.image, post.contenu, post.createdAt 
        FROM post 
        INNER JOIN user ON post.id_user = user.iduser 
        WHERE post.idpost = '${req.params.id}' 
        ORDER BY post.createdAt DESC`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        }
    );
};

exports.updatePost = (req, res) => {
    db.query(`
        UPDATE post
        SET titre = '${req.body.titre}',
            contenu = '${req.body.contenu}'
        WHERE idpost = '${req.params.id}' AND id_user = '${req.body.userId}'
    `, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Post modifié !'});
    });
};

exports.deletePost = (req, res) => {
    db.query(`DELETE FROM post WHERE idpost = '${req.params.id}'`, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Post supprimé !'});
    });
};

exports.getLikesPost = (req, res) => {
    db.query(`
        SELECT user.nom, user.prenom, like_post.id_post
        FROM like_post
        INNER JOIN user ON user.iduser = like_post.id_user
        WHERE like_post.id_post = '${req.params.id}'
    `, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};

exports.likeOrNot = (req, res) => {
    if(req.body.like == 1) {
        db.query(`INSERT INTO like_post(id_user, id_post) VALUES('${req.body.userId}', '${req.params.id}')`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            db.query(`
                UPDATE post
                SET isLike = '${req.body.like}'
                WHERE idpost = '${req.params.id}' AND id_user = '${req.body.userId}'
            `, (error, result, field) => {
                if(error) {
                    return res.status(400).json({error});
                }
                return res.status(201).json({message: 'Utilisateur a liké !'});
            });
        });
    } else if(req.body.like == 0){
        db.query(`DELETE FROM like_post WHERE id_user = '${req.body.userId}' AND id_post = '${req.params.id}'`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            db.query(`
                UPDATE post
                SET isLike = '${req.body.like}'
                WHERE idpost = '${req.params.id}' AND id_user = '${req.body.userId}'
            `, (error, result, field) => {
                if(error) {
                    return res.status(400).json({error});
                }
                return res.status(201).json({message: 'Utilisateur a enlevé son like !'});
            });
        });
    } else {
        return res.status(400).json({error : 'Attention pas de like supérieur à 1'});
    }
};

/************** COMMENT ******************/

exports.newComment = (req, res) => {
    db.query(`INSERT INTO comment(contenu, createdAt, id_post, id_user) VALUES('${req.body.contenu}', NOW(), '${req.params.id}', '${req.body.userId}')`, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Commentaire crée !'});
    });
};

exports.getAllCommentPost = (req, res) => {
    db.query(`
        SELECT comment.id_post, user.nom, user.prenom, user.image, comment.contenu, comment.createdAt
        FROM comment 
        INNER JOIN user ON user.iduser = comment.id_user
        WHERE comment.id_post = ${req.params.id}
        ORDER BY comment.createdAt DESC`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        }
    );
};

exports.updateComment = (req, res) => {
    db.query(`
        UPDATE comment
        SET contenu = '${req.body.contenu}'
        WHERE id_post = '${req.params.idPost}' AND idComment = '${req.params.idComment}'
    `, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Commentaire modifié !'});
    });
};

exports.deleteComment = (req, res) => {
    db.query(`DELETE FROM comment WHERE idcomment = '${req.params.idComment}' AND id_post = '${req.params.idPost}'`, (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        }
        return res.status(201).json({message: 'Commentaire supprimé !'});
    });
};