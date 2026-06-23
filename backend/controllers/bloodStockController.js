const BloodStock = require("../models/BloodStock");
const addNotification = require("../utils/addNotification");
// Create Stock
exports.createStock = async (req, res) => {
  try {
    const stock = await BloodStock.create(req.body);
    await addNotification(
      `${stock.units} units of ${stock.bloodGroup} stock added`,
    );
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Stock
exports.getStock = async (req, res) => {
  try {
    const stock = await BloodStock.find();

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Stock
exports.updateStock = async (req, res) => {
  try {
    const stock = await BloodStock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Stock
exports.deleteStock = async (req, res) => {
  try {
    await BloodStock.findByIdAndDelete(req.params.id);

    res.json({
      message: "Stock Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBloodStock = async (req, res) => {
  try {
    const stock = await BloodStock.find();

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
