const User = require("../models/User");

const getEmergency = async (req, res) => {
  try {
    const data = await User.find({ role: "senior" }); // get seniors only
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmergency };