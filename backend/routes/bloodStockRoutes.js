const express = require("express");

const router = express.Router();

const {
  createStock,
  getStock,
  updateStock,
  deleteStock,
  getBloodStock,
} = require(
  "../controllers/bloodStockController"
);



router.post("/", createStock);

router.get("/", getStock);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);


router.get("/", getBloodStock);


module.exports = router;