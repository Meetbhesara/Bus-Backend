
const { BusRepository }= require("../repositories");
const { BookingRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Error } = require("../utils/common");
const { success } = require("../utils/common");
const generateSegments = require("../utils/common/generateSegment");
const AppError = require("../utils/errors/app-error");
const mongoose = require("mongoose");
const {Bus} = require("../models"); 
const {booking} = require("../models");
const {Seat} =require('../models');
const bookingRepository = new BookingRepository()

async function createBooking(data) {
  const { bus, seatIds, dateOfJourney,passengerName,passengerEmail,passengerPhone} = data;

  // Check seat availability
  const seats = await Seat.find({
    _id: { $in: seatIds },
    isBooked: false,
    bus,
    dateOfJourney
  });

  if (seats.length !== seatIds.length) {
    throw new Error('Some seats are already booked');
  }

  // Create Booking
  const booking = await BookingRepository.create({
    bus,
    seats: seatIds,
    dateOfJourney,
    passengerName,
    passengerEmail,
    passengerPhone
  });

  // Mark seats as booked
  await Seat.updateMany(
    { _id: { $in: seatIds } },
    { isBooked: true, booking: booking._id }
  );

  return booking;
}

async function getBookingById(id) {
  return BookingRepository.findById(id)
    .populate('seats')
    .populate('bus');
}

const Booking = require('../models/Booking');
const Seat = require('../models/Seat');

async function cancelBooking(bookingId) {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking already cancelled');
  }

  // Mark booking as cancelled
  booking.status = 'cancelled';
  booking.paymentStatus = 'refunded'; // You may want to use "pending refund" and refund later
  await booking.save();

  // Mark seats as not booked again
  await Seat.updateMany(
    { _id: { $in: booking.seats } },
    { isBooked: false, booking: null }
  );

  return booking;
}
async function updatePaymentStatus(bookingId, newStatus) {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  booking.paymentStatus = newStatus;
  await booking.save();

  return booking;
}


module.exports = {
  createBooking,
  getBookingById,
  cancelBooking,
  updatePaymentStatus
};