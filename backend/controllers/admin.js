const db = require('../models/db.config');

// Afficher tous les utilisateurs sur ce site
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM user WHERE isAdmin < 1', (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        } 
        return res.status(200).json(result);
    });
};

// Supprimer un utilisateur

// Gestion de profil
exports.getOneUser = (req, res) => {
    db.query(`SELECT * FROM user WHERE iduser='${req.params.id}'`, (error, result, field) => {
        if(result.length > 0) {
            if(error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        } else {
            return res.status(400).json({message : 'Utilisateur non trouvé !'});
        }
    });
};

// Posts par utilisateur
exports.getPostByUser = (req, res) => {
    db.query(`
        SELECT user.nom, user.prenom, user.image, user.description, user.email, idpost, titre, post.image, post.contenu, post.createdAt 
        FROM post 
        INNER JOIN user ON post.id_user = user.iduser
        WHERE user.iduser = '${req.params.id}' 
        ORDER BY post.createdAt DESC`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            }
            const posts = [];
            for(let i in result){
                posts.push(
                    {
                        idpost: result[i].idpost,
                        titre: result[i].titre,
                        contenu: result[i].contenu,
                        createdAt: result[i].createdAt
                    }
                )
            }
            return res.status(200).json(
                {
                    nom: result[0].nom,
                    prenom: result[0].prenom,
                    image: result[0].image,
                    description: result[0].description,
                    email: result[0].email,
                    posts: posts
                }
            );
        }
    );
}