// Require mongoose for MongoDB interactions
const mongoose = require("mongoose");

// Define a schema for the 'Product' model
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  }, // Name of the product, required and must be unique

  description: {
    type: String,
    required: true,
  }, // Description of the product, required

  category: {
    type: String,
    ref: "Category",
    required: true,
  }, // Reference to the category the product belongs to

  buying_price: {
    type: Number,
    required: true,
  }, // Buying price of the product, required

  selling_price: {
    type: Number,
    required: true,
  }, // Selling price of the product, required

  unit: {
    type: String,
  }, // Unit of measurement for the product, optional

  vendor: {
    type: String,
    ref: "Vendor",
    required: true,
  }, // Vendor information for the product

  drawer_number: {
    type: String,
  }, // Drawer number where the product is stored, optional

  reorder_level: {
    type: Number,
  }, // Minimum quantity at which the product triggers a reorder, optional

  created_at: {
    type: Date,
    default: Date.now,
  }, // Timestamp for when the product was created, defaults to the current date/time

  updated_at: {
    type: Date,
    default: Date.now,
  }, // Timestamp for when the product was last updated, defaults to the current date/time
});

// Create a model from the schema
// The third argument specifies the name of the collection in the database ('products')
const Product = mongoose.model("Product", productSchema, "products");

// Export the Product model for use in other parts of the application
module.exports = Product;