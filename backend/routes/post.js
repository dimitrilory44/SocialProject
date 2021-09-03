const express = require('express');
const routes = express.Router();

const postCtrl = require('../controllers/post');

routes.post('/', postCtrl.createPost);

module.exports = routes;