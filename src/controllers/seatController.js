const { route } = require("../routes");
const { BusService } = require("../services");
const mongoose = require("mongoose");
const { Error } = require("../utils/common");
const { success } = require("../utils/common");
 const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Bus } = require("../models");
const { Seat } =require("../models");
const { Booking } =require('../models');
const { SeatService } =require("../services");


async function getAvailableSeats(req, res) {
  try {
    const { busId, date } = req.query;

    if (!busId || !date) {
      return res.status(400).json({ success: false, message: 'Missing busId or date' });
    }

    const seats = await seatService.getAvailableSeats(busId, date);
    res.status(200).json({ success: true, data: seats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getAvailableSeats
};