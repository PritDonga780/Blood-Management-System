const mongoose = require("mongoose");

const campSchema = new mongoose.Schema(
  {
    campName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    organizer: {
      type: String,
    },

    contact: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Camp",
  campSchema
);