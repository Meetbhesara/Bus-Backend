const express = require('express');
const router = express.Router();    
const {loginController, signupController} = require('../../controllers');
router.post('/', loginController.login);       
module.exports = router;