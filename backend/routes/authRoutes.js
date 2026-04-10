const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");

console.log("REGISTER:", controller.registerUser);
console.log("LOGIN:", controller.login);

router.post("/register", controller.registerUser);
router.post("/login", controller.login);

module.exports = router;