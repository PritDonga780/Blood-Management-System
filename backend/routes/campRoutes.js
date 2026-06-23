const express = require("express");

const router = express.Router();

const {
  createCamp,
  getCamps,
  deleteCamp,
} = require("../controllers/campController");

router.post("/", createCamp);

router.get("/", getCamps);

router.delete("/:id", deleteCamp);

module.exports = router;