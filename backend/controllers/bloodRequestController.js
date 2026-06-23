const BloodRequest =
  require("../models/BloodRequest");
const BloodStock =
  require("../models/BloodStock");
const addNotification =
  require("../utils/addNotification");

// Create Request
exports.createRequest =
  async (req, res) => {
    try {

      const request =
        await BloodRequest.create({
          ...req.body,
          status: "Pending",
        });

      await addNotification(
        `New blood request added for ${request.patientName}`
      );

      res.status(201).json(
        request
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// Get All Requests
exports.getRequests =
  async (req, res) => {
    try {

      const requests =
        await BloodRequest.find()
          .sort({
            createdAt: -1,
          });

      res.json(requests);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// Approve Request
exports.approveRequest =
  async (req, res) => {
    try {

      const request =
        await BloodRequest.findById(
          req.params.id
        );

      if (!request) {
        return res.status(404).json({
          message:
            "Request not found",
        });
      }

      const stock =
        await BloodStock.findOne({
          bloodGroup:
            request.bloodGroup,
        });

      if (!stock) {
        return res.status(404).json({
          message:
            "Blood stock not found",
        });
      }

      if (
        stock.units <
        request.units
      ) {
        return res.status(400).json({
          message:
            "Insufficient blood stock",
        });
      }

      stock.units =
        stock.units -
        request.units;

      await stock.save();

      request.status =
        "Approved";

      await request.save();

      await addNotification(
        `${request.units} units of ${request.bloodGroup} issued for ${request.patientName}`
      );

      res.json({
        message:
          "Request Approved",
        request,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
// Reject Request
exports.rejectRequest =
  async (req, res) => {
    try {

      const request =
        await BloodRequest.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Rejected",
          },
          {
            new: true,
          }
        );

      if (!request) {
        return res
          .status(404)
          .json({
            message:
              "Request not found",
          });
      }

      await addNotification(
        `Blood request rejected for ${request.patientName}`
      );

      res.json({
        message:
          "Request Rejected",
        request,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// Delete Request
exports.deleteRequest =
  async (req, res) => {
    try {

      const request =
        await BloodRequest.findByIdAndDelete(
          req.params.id
        );

      if (!request) {
        return res
          .status(404)
          .json({
            message:
              "Request not found",
          });
      }

      res.json({
        message:
          "Request Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };