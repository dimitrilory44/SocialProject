const express = require('express');
const app = express();
const path = require('path');

const helmet = require('helmet');

const routeAdmin = require('./routes/admin');
const routeUser = require('./routes/user');
const routePost = require('./routes/post');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'),
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api', (req, res) => {
    res.json({title: 'Bienvenue sur mon API REST Groupomania'});
});

// Authentification de l'utilisateur
app.use('/api/auth', routeUser);

// Recupération des users pour l'administration
app.use('/api/users', routeAdmin);

// Recupération des posts
app.use('/api/posts', routePost);

module.exports = app;