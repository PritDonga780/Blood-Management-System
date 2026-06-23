const Donor = require("../models/Donor");
const BloodRequest = require("../models/BloodRequest");
const BloodStock = require("../models/BloodStock");

exports.getStats = async (req, res) => {
  try {

    const donors =
      await Donor.countDocuments();

    const requests =
      await BloodRequest.countDocuments();

    const stock =
      await BloodStock.find();

    const bloodUnits =
      stock.reduce(
        (sum, item) =>
          sum + item.units,
        0
      );

    const recentRequests =
      await BloodRequest.find()
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      bloodUnits,
      requests,
      donors,
      recentRequests,
      notifications: [],
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};