const Donor = require("../models/Donor");
const addNotification = require("../utils/addNotification");

// Create Donor
exports.createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);

    await addNotification(
  `New donor registered: ${donor.name}`)
  
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();

    res.json(donors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Donor
exports.deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Donor Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Donor

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(donor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
