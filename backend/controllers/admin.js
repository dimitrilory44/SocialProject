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