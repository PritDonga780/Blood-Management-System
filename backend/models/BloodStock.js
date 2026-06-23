const mongoose = require("mongoose");

const bloodStockSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "BloodStock",
  bloodStockSchema
);