const express = require('express');
const router = express.Router();
const { bookingController }=require('../../controllers');

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBooking);
router.put('/cancel/:bookingId', bookingController.cancelBooking);

// Update Payment Status (Admin or Payment Gateway Callback)
router.put('/payment-status/:bookingId', bookingController.updatePayment);

module.exports = router;

