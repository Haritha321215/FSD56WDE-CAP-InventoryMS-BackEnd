// Import the Express library
const express = require("express");

// Create a new router object
const userRouter = express.Router();

// Import the user controller which contains the logic for user-related routes
const userController = require("./userController");

// Import the authentication middleware to protect certain routes
const auth = require("../../middleware/auth");


// Define the endpoints

// POST /api/users/register: Register a new user
userRouter.post("/register", userController.register);

// POST /api/users/login: Log in a user
userRouter.post("/login", userController.login);

// GET /api/users/profile: Get user profile (protected, user needs to be authenticated)
userRouter.get("/profile", auth.verifyToken, userController.getUser);

// PUT /api/users/profile: Update user profile
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
userRouter.put("/profile", auth.verifyToken, auth.isAdmin, userController.updateUser);

// DELETE /api/users/profile: Delete user profile
// This route is protected. The user needs to be authenticated (auth.verifyToken) and needs to have admin privileges (auth.isAdmin)
userRouter.delete("/profile", auth.verifyToken, auth.isAdmin, userController.deleteUser);

// GET /api/users/logout: Log out user (protected, user needs to be authenticated)
userRouter.get("/logout", auth.verifyToken, userController.logout);

// Export the router
module.exports = userRouter;

