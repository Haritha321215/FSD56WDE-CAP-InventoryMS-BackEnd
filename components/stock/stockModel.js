// Require mongoose for MongoDB interactions
const mongoose = require("mongoose");

// Define a schema for the 'Stock' model
const stockSchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.String,
    ref: "Product",
    required: true,
  }, // Reference to the product, required

  stockQuantity: {
    type: Number,
    required: true,
  }, // Quantity of the product in stock, required

  drawer_number: {
    type: String,
    required: true,
  }, // Drawer number where the stock is stored, required

  min_quantity: {
    type: Number,
    required: true,
  }, // Minimum threshold quantity for reordering, required

  max_quantity: {
    type: Number,
  }, // Maximum threshold quantity for stock, optional

  buying_price: {
    type: Number,
    required: true,
  }, // Buying price of the product, required

  selling_price: {
    type: mongoose.Schema.Types.Number,
    ref: "Product",
    required: true,
  }, // Selling price of the product, required

  total_buying_price: {
    type: Number,
    required: true,
  }, // Total buying price for the stock, required

  total_selling_price: {
    type: Number,
    required: true,
  }, // Total selling price for the stock, required

  last_updated: {
    type: Date,
    default: Date.now,
  }, // Timestamp for when the stock was last updated, defaults to the current date/time
});

// Create a model from the schema
// The third argument specifies the name of the collection in the database ('stocks')
const Stock = mongoose.model("Stock", stockSchema, "stocks");

// Export the Stock model for use in other parts of the application
module.exports = Stock;