const loginController= require('./loginController');
const signupController = require('./signupController');
const protectedController = require('./protectedController');
const busController = require('./busController');
 const seatController = require('./seatController');
 const bookingController = require('./bookingController');

module.exports = {
  loginController,
  signupController,
 protectedController,
    busController,
  seatController,
  bookingController
};