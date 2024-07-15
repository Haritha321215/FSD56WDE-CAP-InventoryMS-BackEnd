// Import the order model
const Order = require("./orderModel");

// Import the product model
const Product = require("../product/productModel");

// Define the order controller
const orderController = {
  // Controller method to add a new order
  addOrder: async (request, response) => {
    try {
      const { customerName, productName, quantity } = request.body;
      console.log(customerName, productName, quantity);
      
      // Find the product by name in the p roduct collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "product not found" });
      }
      console.log("product found" + product.productName);

      // // Check if the order is already in the database
      // const order = await Order.findOne({ productName });
      // if (order) {
      //   return response.status(400).json({ message: "Order already exists" });
      // }

      // Calculate the total amount for the order
      const totalAmount = quantity * product.selling_price;
      
      // Create a new order object
      const newOrder = new Order({
        customerName: customerName,
        productName: product.productName,
        quantity: quantity,
        total_amount: totalAmount
      });

      // Save the order in the database
      const saveOrder = await newOrder.save();
      await Order.collection.dropIndexes();
      
      // Return the saved order response to the front end
      response.status(201).json({
        message: "order created successfully",
        order: saveOrder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Controller method to get an order by its ID
  getOrderById: async (request, response) => {
    try {
      // Get the order ID from the request parameters
      const orderId = request.params.orderId;

      // Find the order by ID from the database
      const order = await Order.findById(orderId);
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }

      // Return the found order response
      response.json({ message: "order found", order });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Controller method to get all orders
  getOrders: async (request, response) => {
    try {
      // Find all orders from the database
      const orders = await Order.find();
      if (!orders) {
        return response.status(400).json({ message: "Orders not found" });
      }

      // Return the found orders response
      response.json({ message: "orders found", orders });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Controller method to update an order by its ID
  updateOrderById: async (request, response) => {
    try {
      // Get the order ID from the request parameters
      const orderId = request.params.orderId;

      // Get the new order name from the request body
      const { productName, quantity } = request.body;

      // Find the order by ID from the database
      const order = await Order.findById(orderId);
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }
      const totalAmount = quantity * product.buying_price;
      // Update the order if it exists
      if (productName) order.productName = productName;
      if (quantity) order.quantity = quantity;

      // Save the updated order to the database
      const updatedOrder = await order.save();

      // Return the updated order response
      response.json({ message: "order updated", order: updatedOrder });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Controller method to delete an order by its ID
  deleteOrderById: async (request, response) => {
    try {
      // Get the order ID from the request parameters
      const orderId = request.params.orderId;

      // Find the order by ID from the database
      const order = await Order.findById(orderId);
      if (!order) {
        return response.status(400).json({ message: "Order not found" });
      }

      // Delete the order if it exists
      await order.deleteOne();
      await Order.collection.dropIndexes();

      // Return a success message
      response.json({ message: "order has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the order controller to make it accessible in other parts of the application
module.exports = orderController;