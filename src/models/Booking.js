const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  }],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  dateOfJourney: {
    type: String,
    ref:'Bus', // or Date
    required: true,
  },
  passangerName:{
    type:String,
    required:true,
  },
  passangerEmail:{
    type:String,
    require:true
  },
  passangerPhone:{
  type:Number,
  required:true
  },
  status: {
  type: String,
  enum: ['confirmed', 'cancelled', 'pending'],
  default: 'confirmed'
},
paymentStatus: {
  type: String,
  enum: ['paid', 'pending', 'failed', 'refunded'],
  default: 'pending'
},

}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
