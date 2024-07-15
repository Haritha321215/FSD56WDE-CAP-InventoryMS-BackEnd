
// Import the Express router
const express = require("express");

// Create a new router object
const categoryRouter = express.Router();

// Import the category controller which contains the logic for category-related routes
const categoryController = require("../../components/category/categoryController");

// Import the authentication middleware to protect certain routes
const auth = require("../../middleware/auth");

// Define the endpoints

// POST /api/categories/addCategory: Add a new category
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
categoryRouter.post("/addCategory", auth.verifyToken, auth.isAdmin, categoryController.addCategory);

// GET /api/categories/:categoryId: Get a category by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
categoryRouter.get("/:categoryId", auth.verifyToken, auth.isAdmin, categoryController.getCategoryById);

// GET /api/categories: Get all categories
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
categoryRouter.get("/", auth.verifyToken, auth.isAdmin, categoryController.getCategorys);

// PUT /api/categories/:categoryId: Update a category by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
categoryRouter.put("/:categoryId", auth.verifyToken, auth.isAdmin, categoryController.updateCategoryById);

// DELETE /api/categories/:categoryId: Delete a category by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
categoryRouter.delete("/:categoryId", auth.verifyToken, auth.isAdmin, categoryController.deleteCategoryById);

// Export the router for use in other parts of the application
module.exports = categoryRouter;