const {Bus} = require('../models');
const {Seat}=require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Error, success } = require('../utils/common');

async function getAvailableSeats(busId, date) {
  return Seat.find({ bus: busId, date, isBooked: false });
}

module.exports = {
  getAvailableSeats
};
