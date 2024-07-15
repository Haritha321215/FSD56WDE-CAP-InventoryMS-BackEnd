// Import mongoose
const mongoose = require("mongoose");

// Define the purchase order schema
const purchaseOrderSchema = new mongoose.Schema({
  vendorName: {
    type: mongoose.Schema.Types.String,
    ref: "Vendor",
    required: true,
  }, // Reference to Vendor model
  productName: {
    type: mongoose.Schema.Types.String,
    ref: "Product",
    required: true,
  }, // Reference to Product model
  quantity: {
    type: Number,
    required: true,
  }, // Quantity of the product being ordered
  unitPrice: {
    type: Number,
    required: true,
  }, // Price per unit of the product
  totalPrice: {
    type: Number,
    required: true,
  }, // Total price for the order (quantity * unitPrice)
  orderDate: {
    type: Date,
    default: Date.now,
  }, // Date when the order was placed
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  }, // Current status of the order
});

// Create the PurchaseOrder model
const PurchaseOrder = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema,
  "purchaseorders"
);

// Export the PurchaseOrder model
module.exports = PurchaseOrder;
