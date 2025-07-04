const { route } = require("../routes");
const { BusService } = require("../services");
const mongoose = require("mongoose");
const { Error } = require("../utils/common");
const { success } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Bus } = require("../models");
const  {Booking}=require("../models");
const { seat } =require("../models");

async function createBooking(req, res) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

async function getBooking(req, res) {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}
// const bookingService = require('../services/booking-service');

async function cancelBooking(req, res) {
  try {
    const { bookingId } = req.params;
    const result = await bookingService.cancelBooking(bookingId);
    res.status(200).json({ success: true, message: 'Booking cancelled', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updatePayment(req, res) {
  try {
    const { bookingId } = req.params;
    const { paymentStatus } = req.body;

    const updated = await bookingService.updatePaymentStatus(bookingId, paymentStatus);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


module.exports = {
  createBooking,
  getBooking,
  cancelBooking,
  updatePayment
};