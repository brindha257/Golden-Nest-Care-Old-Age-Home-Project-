const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};