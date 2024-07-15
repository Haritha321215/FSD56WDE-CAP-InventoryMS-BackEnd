// Import mongoose
const mongoose = require("mongoose");

// Define the inventory schema
const inventorySchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.String,
    ref: "Product",
    required: true, // Reference to the product name in the Product collection
  },
  drawer_number: { 
    type: String, 
    required: true 
  }, // Drawer number where the product is stored
  openingStock: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Quantity of the product at the start
  inStock: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Quantity of the product added to the inventory
  outStock: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Quantity of the product removed from the inventory
  outStockPrice: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Quantity of the product removed from the inventory
  closingStock: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Quantity of the product at the end
  totalStockBuyingPrice: { 
    type: Number, 
    default: 0 
  }, // Total buying price of the stock
  totalStockSellingPrice: { 
    type: Number, 
    default: 0 
  }, // Total selling price of the stock
  max_quantity: { 
    type: Number 
  }, // Maximum threshold quantity
  min_quantity: { 
    type: Number 
  }, // Minimum threshold quantity
  reorder_level: { 
    type: Number 
  }, // Minimum quantity at which the product triggers a reorder
  reorder_required: { 
    type: Boolean, 
    default: false 
  }, // Indicator if reorder is required
  last_updated: { 
    type: Date, 
    default: Date.now 
  }, // Timestamp for when the inventory was last updated
});

// Create the Inventory model
const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");

// Export the Inventory model
module.exports = Inventory;