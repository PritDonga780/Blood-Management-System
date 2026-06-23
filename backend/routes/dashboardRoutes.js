const express = require("express");

const router = express.Router();

const {
  getStats,
} = require("../controllers/dashboardController");

router.get("/stats", getStats);
exports.getStats = async (req, res) => {
  try {
    // code
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = router;