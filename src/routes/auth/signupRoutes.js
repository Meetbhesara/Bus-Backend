const express = require('express');
const router = express.Router();    
const { loginController, signupController } = require('../../controllers');
router.post('/', signupController.signup);
module.exports = router;