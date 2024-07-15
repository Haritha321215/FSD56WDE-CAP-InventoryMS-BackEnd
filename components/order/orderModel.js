// Import mongoose for MongoDB interactions
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  // Customer's name for the order
  customerName: { type: String, required: true },
  
  // Reference to the product being ordered
  productName: { type: mongoose.Schema.Types.String, ref: 'Product', required: true },
  
  // Quantity of the product ordered
  quantity: { type: Number, required: true },
  
  // Total amount for the order
  total_amount: { type: Number, required: true },
  
  // Date when the order was placed, defaults to the current date
  order_date: { type: Date, default: Date.now },
  
  // Status of the order with predefined possible values
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' }
});

// Create the Order model using the schema, with the collection name 'orders'
const Order = mongoose.model('Order', orderSchema, 'orders');

// Export the Order model to make it accessible in other parts of the application
module.exports = Order;