// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Define the schema for the 'Category' model
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  }, // Name of the category, required and must be unique

  description: {
    type: String,
  }, // Description of the category, optional

  created_at: {
    type: Date,
    default: Date.now,
  }, // Timestamp for when the category was created, defaults to the current date/time

  updated_at: {
    type: Date,
    default: Date.now,
  }, // Timestamp for when the category was last updated, defaults to the current date/time
});

// Create a model from the schema
// The third argument specifies the name of the collection in the database ('categories')
const Category = mongoose.model("Category", categorySchema, "categories");

// Export the Category model for use in other parts of the application
module.exports = Category;
