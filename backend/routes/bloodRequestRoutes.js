const express =
  require("express");

const router =
  express.Router();

const {
  createRequest,
  getRequests,
  approveRequest,
  rejectRequest,
  deleteRequest,
} = require(
  "../controllers/bloodRequestController"
);

router.post(
  "/",
  createRequest
);

router.get(
  "/",
  getRequests
);

router.put(
  "/approve/:id",
  approveRequest
);

router.put(
  "/reject/:id",
  rejectRequest
);

router.delete(
  "/:id",
  deleteRequest
);

module.exports =
  router;