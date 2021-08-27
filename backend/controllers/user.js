const db = require('../models/db.config');
const bcrypt = require('bcrypt');

exports.newUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const password = hash;
        db.query(`INSERT INTO user(email, password, nom, prenom, image) VALUES('${req.body.email}', '${password}', '${req.body.nom}', '${req.body.prenom}', 'rrrr')`, (error, result, field) => {
            if(error) {
                return res.status(400).json({error});
            } 
            return res.status(200).json(result);
        });
    })
    .catch(err => res.status(400).json({err}));
};

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM user', (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        } 
        return res.status(200).json(result);
    });
};