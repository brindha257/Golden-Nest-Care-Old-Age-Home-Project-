const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  room: String,
  medicalHistory: String,
  allergies: String,
  medications: String,
  diet: String,
  activity: String,

  family: {
    name: String,
    relation: String,
    phone: String,
    email: String
  },

  notes: [String],
  history: [String],

  careChecklist: {
    morning: Boolean,
    medication: Boolean,
    activity: Boolean,
    evening: Boolean
  },

  role: String
});

module.exports = mongoose.model("User", userSchema);