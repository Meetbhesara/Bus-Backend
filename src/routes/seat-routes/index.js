const express =require('express');
const router=express.Router();
const { seatController } = require('../../controllers');

router.get('/available', seatController.getAvailableSeats);
module.exports=router;