const express = require('express');
const User = require('../models/userModel');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', (req, res) => authController.register);
router.post('/logout', (req, res) => authController.logout);

module.exports = router;