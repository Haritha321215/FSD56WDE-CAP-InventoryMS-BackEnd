// Import the express module to create an Express router
const express = require("express");

// Create a new Express router instance
const stockRouter = express.Router();

// Import the stock controller for handling stock-related operations
const stockController = require("./stockController");

// Import authentication middleware for protecting routes
const auth = require("../../middleware/auth");

// Define the endpoints for stock management
stockRouter.post("/addStock", auth.verifyToken, auth.isAdmin, stockController.addStock);
stockRouter.get("/:stockId", auth.verifyToken, auth.isAdmin, stockController.getStockById);
stockRouter.get("/", auth.verifyToken, auth.isAdmin, stockController.getStocks);
stockRouter.put("/:stockId", auth.verifyToken, auth.isAdmin, stockController.updateStockById);
stockRouter.delete("/:stockId", auth.verifyToken, auth.isAdmin, stockController.deleteStockById);

// Export the stockRouter to make it accessible in other parts of the application
module.exports = stockRouter;