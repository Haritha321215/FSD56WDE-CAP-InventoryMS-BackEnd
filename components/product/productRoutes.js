// Import the Express library
const express = require("express");

// Create a new router object for product routes
const productRouter = express.Router();

// Import the product controller which contains the logic for product-related routes
const productController = require("./productController");

// Import the authentication middleware to protect certain routes
const auth = require("../../middleware/auth");

// Define the endpoints

// POST /api/products/addProduct: Add a new product
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
productRouter.post("/addProduct", auth.verifyToken, auth.isAdmin, productController.addProduct);

// GET /api/products/:productId: Get a product by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
productRouter.get("/:productId", auth.verifyToken, auth.isAdmin, productController.getProductById);

// GET /api/products: Get all products
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
productRouter.get("/", auth.verifyToken, auth.isAdmin, productController.getProducts);

// PUT /api/products/:productId: Update a product by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
productRouter.put("/:productId", auth.verifyToken, auth.isAdmin, productController.updateProductById);

// DELETE /api/products/:productId: Delete a product by ID
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
productRouter.delete("/:productId", auth.verifyToken, auth.isAdmin, productController.deleteProductById);

// Export the router for use in other parts of the application
module.exports = productRouter;