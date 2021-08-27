const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/', userCtrl.newUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;