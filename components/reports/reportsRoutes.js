// Import the express router
const express = require("express");
const reportsRouter = express.Router();
const reportsController = require("./reportsController");
const auth = require("../../middleware/auth");

// Define the endpoints for purchase orders
reportsRouter.get("/generateInventoryReport", auth.verifyToken, auth.isAdmin, reportsController.generateInventoryReport); 

// Export the router
module.exports = reportsRouter;

