const db = require('../models/db.config');

exports.newPost = (res, req) => {
    db.query(`INSERT INTO post(titre, contenu, image) VALUES('${req.body.titre}', '${req.body.contenu}', '${req.body.image}')`, (error, result, field) => {
        if(error) {
            console.log(`${req.body.titre}`);
            return res.status(400).json({error});
        } 
        return res.status(201).json({message: 'Votre post a été crée !'});
    });
};

exports.getAllPosts = (req, res) => {
    db.query('SELECT * FROM post', (error, result, field) => {
        if(error) {
            return res.status(400).json({error});
        } 
        return res.status(200).json(result);
    });
};