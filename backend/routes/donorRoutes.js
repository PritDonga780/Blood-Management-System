const express = require("express");

const router = express.Router();

const {
  createDonor,
  getDonors,
  deleteDonor,
  updateDonor,
} = require(
  "../controllers/donorController"
);

router.post("/", createDonor);

router.get("/", getDonors);

router.put("/:id", updateDonor);

router.delete("/:id", deleteDonor);

module.exports = router;