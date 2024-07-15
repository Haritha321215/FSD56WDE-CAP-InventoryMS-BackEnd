// Import the dotenv package to read environment variables from a .env file
require('dotenv').config();

// Create necessary variables by reading values from environment variables
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection string
const PORT = process.env.PORT; // Port number for the server to listen on
const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JSON Web Token (JWT) authentication

// Export the variables so they can be used in other parts of the application
module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};