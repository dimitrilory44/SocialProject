const db = require('../models/db.config');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    // Verification email disponible et unique
    db.query(`SELECT * FROM user WHERE email='${req.body.email}'`, (error, result, field) => {
        if(result.length > 0) {
            res.status(400).json({message : 'Email déjà utilisé'})
        } else {
            // cryptage password et ajout utilisateur
            bcrypt.hash(req.body.password, 10)
            .then(passwordHash => {
                db.query(`INSERT INTO user(email, password, nom, prenom) VALUES('${req.body.email}', '${passwordHash}', '${req.body.nom}', '${req.body.prenom}')`, (error, result, field) => {
                    if(error) {
                        return res.status(400).json({error});
                    } 
                    return res.status(200).json(result);
                });
            })
            .catch(err => res.status(500).json({err}));
        }
    });
};

exports.login = (req, res) => {
    // Recherche de l'utilisateur
    db.query(`SELECT * FROM user WHERE email='${req.body.email}'`, (error, result, field) => {
        if(result.length > 0) {
            // Verification password pour l'authentification
            bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect !'})
                }
                return res.status(200).json(
                    {
                        userId: result[0].iduser,
                        email: result[0].email,
                        nom: result[0].nom,
                        prenom: result[0].prenom,
                        image: result[0].image,
                        description: result[0].description,
                        isAdmin: result[0].isAdmin,
                        // NE PAS OUBLIER LA GENERATION DE TOKEN
                        // token: jwt.sign(
                        //     {userId: result[0].iduser},
                        //     'TOKEN_SECRET',
                        //     {expiresIn: '24h'}
                        // )
                    }
                );
            })
            .catch(error => res.status(500).json({error}))
        } else {
            return res.status(401).json({error: "Utilisateur non trouvé"});
        }
    });
}