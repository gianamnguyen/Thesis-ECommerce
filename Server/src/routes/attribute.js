const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const AttributeController = require("../app/controllers/AttributeController");

// Create attribute
router.post("/create", [authJwt.verifyToken], AttributeController.createAttribute);

// Get list all attributes
router.get("/get-list-attributes", [authJwt.verifyToken], AttributeController.getListAttributes)

// Update status attribute
router.put("/update-status-attribute", [authJwt.verifyToken], AttributeController.updateStatusAttribute)

// Delete attribute
router.delete("/delete-attribute", [authJwt.verifyToken], AttributeController.deleteAttribute)

module.exports = router;
