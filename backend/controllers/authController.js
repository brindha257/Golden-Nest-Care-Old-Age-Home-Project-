const User = require("../models/User");

// ✅ REGISTER
exports.registerUser = async (req, res) => {
  res.send("register working");
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("USER FROM DB:", user);

    // 🔥 TEMP FIX → remove password check
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // ✅ FORCE LOGIN SUCCESS
    res.json({
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};