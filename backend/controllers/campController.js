const Camp = require("../models/Camp");
const addNotification = require("../utils/addNotification");
// Create Camp
exports.createCamp = async (req, res) => {
  try {
    const camp = await Camp.create(req.body);
    await addNotification(`Donation camp scheduled: ${camp.campName}`);
    res.status(201).json(camp);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Camps
exports.getCamps = async (req, res) => {
  try {
    const camps = await Camp.find().sort({
      date: 1,
    });

    res.json(camps);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Camp
exports.deleteCamp = async (req, res) => {
  try {
    await Camp.findByIdAndDelete(req.params.id);

    res.json({
      message: "Camp Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
