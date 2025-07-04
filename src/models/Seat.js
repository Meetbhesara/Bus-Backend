const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', null],
    default: null,
  },
  dateOfJourney: {
    type: String,
    ref:'Bus',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Seat', seatSchema);
