const express = require('express');
const router = express.Router();    
const { loginController, signupController } = require('../../controllers');
const loginroutes = require('./loginRoutes');
const signuproutes = require('./signupRoutes');

router.use('/login', loginroutes);
router.use('/signup', signuproutes);

module.exports = router;