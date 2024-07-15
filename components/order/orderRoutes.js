// Import the express module to create an Express router
const express = require("express");

// Create a new Express router instance
const orderRouter = express.Router();

// Import the order controller for handling order-related operations
const orderController = require("./orderController");

// Import authentication middleware for protecting routes
const auth = require("../../middleware/auth");

// Define the endpoints for order management
orderRouter.post("/addOrder", auth.verifyToken, auth.isAdmin, orderController.addOrder); // Add a new order
orderRouter.get("/:orderId", auth.verifyToken, auth.isAdmin, orderController.getOrderById); // Get order by ID
orderRouter.get("/", auth.verifyToken, auth.isAdmin, orderController.getOrders); // Get all orders
orderRouter.put("/:orderId", auth.verifyToken, auth.isAdmin, orderController.updateOrderById); // Update order by ID
orderRouter.delete("/:orderId", auth.verifyToken, auth.isAdmin, orderController.deleteOrderById); // Delete order by ID

// Export the orderRouter to make it accessible in other parts of the application
module.exports = orderRouter;