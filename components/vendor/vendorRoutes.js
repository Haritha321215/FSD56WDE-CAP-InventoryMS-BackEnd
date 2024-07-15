// Import the Express library
const express = require("express");

// Create a new router object for vendor routes
const vendorRouter = express.Router();

// Import the vendor controller which contains the logic for vendor-related routes
const vendorController = require("./vendorController");

// Import the authentication middleware to protect certain routes
const auth = require("../../middleware/auth");

// Define the endpoints

// POST /api/vendors/addVendor: Add a new vendor
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
vendorRouter.post("/addVendor", auth.verifyToken, auth.isAdmin, vendorController.addVendor);

// GET /api/vendors/:vendorId: Get a vendor by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
vendorRouter.get("/:vendorId", auth.verifyToken, auth.isAdmin, vendorController.getVendorById);

// GET /api/vendors: Get all vendors
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
vendorRouter.get("/", auth.verifyToken, auth.isAdmin, vendorController.getVendors);

// PUT /api/vendors/:vendorId: Update a vendor by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
vendorRouter.put("/:vendorId", auth.verifyToken, auth.isAdmin, vendorController.updateVendorById);

// DELETE /api/vendors/:vendorId: Delete a vendor by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
vendorRouter.delete("/:vendorId", auth.verifyToken, auth.isAdmin, vendorController.deleteVendorById);

// Export the router for use in other parts of the application
module.exports = vendorRouter;