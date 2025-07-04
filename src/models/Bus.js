const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true }, // Format: "HH:mm"
  arrivalTime: { type: String, required: true },
  date:{type:String ,required:true},  // Format: "HH:mm"
  availableSeats: { type: Number, required: true }
});

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dateOfJourney: {
    type: Date,
    required: true
  },
  route: {
    type: [String], // Example: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"]
    required: true
  },
  departureTime:{
    type:String,
    required:true,
  },
  segments: {
    type: [segmentSchema],
    required: true
  },
  busType: {
    type: String,
    enum: ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater'],
    default: 'Non-AC Seater'
  },
  isCancelled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);
