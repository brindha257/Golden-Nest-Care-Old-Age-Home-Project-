const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  residentName: String,
  type: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
    default: "ACTIVE"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Emergency", emergencySchema);
