const express = require('express');
const router = express.Router();   
// const protectedRoutes = require('./protectedRoutes'); 

const auth=require('./auth');
const buses = require('./buses');
const seat_routes=require('./seat-routes');
const booking_routes=require('./booking-routes');

router.use('/auth', auth);
// router.use('/protected', protectedRoutes);
router.use('/buses',buses);
router.use('/seat_routes',seat_routes);
router.use('/booking_routes',booking_routes);
module.exports = router;
