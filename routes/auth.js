const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


// action = /auth/register
router.post('/register', authController.register);







module.exports = router;