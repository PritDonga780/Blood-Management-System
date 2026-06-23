const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: String,

    bloodGroup: String,

    units: Number,

    hospital: String,

    reason: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
