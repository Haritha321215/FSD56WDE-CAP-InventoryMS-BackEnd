// Import the Express library to create a router
const express = require("express");

// Create a new router object for inventory-related routes
const inventoryRouter = express.Router();

// Import the inventory controller
const inventoryController = require("./inventoryController");

// Import the authentication middleware
const auth = require("../../middleware/auth");

// Define the endpoints

// POST /addInventory: Add new inventory (protected, user needs to be authenticated and an admin)
inventoryRouter.post("/addInventory", auth.verifyToken, auth.isAdmin, inventoryController.addInventory);

// GET /:inventoryId: Get inventory by inventory ID (protected, user needs to be authenticated and an admin)
inventoryRouter.get("/:inventoryId", auth.verifyToken, auth.isAdmin, inventoryController.getInventoryById);

// GET /: Get all inventories (protected, user needs to be authenticated and an admin)
inventoryRouter.get("/", auth.verifyToken, auth.isAdmin, inventoryController.getInventories);

// PUT /:inventoryId: Update inventory by inventory ID (protected, user needs to be authenticated and an admin)
inventoryRouter.put("/:inventoryId", auth.verifyToken, auth.isAdmin, inventoryController.updateInventoryById);

// DELETE /:inventoryId: Delete inventory by inventory ID (protected, user needs to be authenticated and an admin)
inventoryRouter.delete("/:inventoryId", auth.verifyToken, auth.isAdmin, inventoryController.deleteInventoryById);

// Export the router to make it accessible in other parts of the application
module.exports = inventoryRouter;