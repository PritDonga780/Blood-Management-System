const mongoose = require("mongoose");

const donationCampSchema =
  new mongoose.Schema(
    {
      campName: String,

      location: String,

      date: Date,
    },
    { timestamps: true }
  );

module.exports =
  mongoose.model(
    "DonationCamp",
    donationCampSchema
  );