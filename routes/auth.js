const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


// action = /auth/register
router.post('/register', authController.register);
// action = /auth/login
router.post('/login', authController.login);









module.exports = router;