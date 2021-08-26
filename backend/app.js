const express = require('express');
const app = express();

const routeUser = require('./routes/user');
const routePost = require('./routes/post');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'),
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    next();
});

app.get('/api', (req, res) => {
    res.json({title: 'Bienvenue sur mon API REST Groupomania'});
});

// recupération des posts
app.use('/api/posts', routePost);

app.use('/api/users', routeUser);

module.exports = app;