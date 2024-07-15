// Business logic for managing purchase orders
// Import necessary models
const PurchaseOrder = require("./purchaseorderModel");
const Product = require("../product/productModel");
const Vendor = require("../vendor/vendorModel");

// Define the purchase order controller methods
const purchaseorderController = {
  // Add a new purchase order to the database
  addpurchaseorder: async (request, response) => {
    try {
      const { vendorName, productName, quantity, unitPrice } = request.body;
      console.log(vendorName, productName, quantity, unitPrice);
      
      // Find the product by name in the product collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }
      console.log("Product found: " + product.productName);
      
      // Find the vendor by name in the vendor collection
      const vendor = await Vendor.findOne({ vendorName });
      if (!vendor) {
        return response.status(404).json({ error: "Vendor not found" });
      }
      console.log("Vendor found: " + vendor.vendorName);
      
      // Check if the purchase order already exists in the database
      const existingOrder = await PurchaseOrder.findOne({ productName });
      if (existingOrder) {
        return response.status(400).json({ message: "Purchase order already exists" });
      }
      
      // Calculate the total price for the purchase order
      const totalPrice = quantity * unitPrice;
      
      // Create a new purchase order object
      const newpurchaseorder = new PurchaseOrder({
        vendorName: vendor.vendorName,
        productName: product.productName,
        quantity,
        unitPrice,
        totalPrice,
      });
      
      // Save the new purchase order in the database
      const savepurchaseorder = await newpurchaseorder.save();
      await PurchaseOrder.collection.dropIndexes();
      
      // Return the saved purchase order response to the client
      response.status(201).json({
        message: "Purchase order created successfully",
        purchaseorder: savepurchaseorder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  
  // Get a purchase order by its ID
  getpurchaseorderById: async (request, response) => {
    try {
      const purchaseorderId = request.params.purchaseorderId;
      const purchaseorder = await PurchaseOrder.findById(purchaseorderId);
      if (!purchaseorder) {
        return response.status(400).json({ message: "Purchase order not found" });
      }
      response.json({ message: "Purchase order found", purchaseorder });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  
  // Get all purchase orders
  getpurchaseorders: async (request, response) => {
    try {
      console.log("inside pords");
      const purchaseorders = await PurchaseOrder.find();
      console.log(purchaseorders);
      if (!purchaseorders) {
        return response.status(400).json({ message: "Purchase orders not found" });
      }
      response.json({ message: "Purchase orders found", purchaseorders });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  
  // Update a purchase order by its ID
  updatepurchaseorderById: async (request, response) => {
    try {
      const purchaseorderId = request.params.purchaseorderId;
      const { quantity } = request.body;
      const purchaseorder = await PurchaseOrder.findById(purchaseorderId);
      if (!purchaseorder) {
        return response.status(400).json({ message: "Purchase order not found" });
      }
      if (quantity) {
        purchaseorder.quantity = quantity;
      }
      const updatedpurchaseorder = await purchaseorder.save();
      response.json({
        message: "Purchase order updated",
        purchaseorder: updatedpurchaseorder,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  
  // Delete a purchase order by its ID
  deletepurchaseorderById: async (request, response) => {
    try {
      const purchaseorderId = request.params.purchaseorderId;
      const purchaseorder = await PurchaseOrder.findById(purchaseorderId);
      if (!purchaseorder) {
        return response.status(400).json({ message: "Purchase order not found" });
      }
      await purchaseorder.deleteOne();
      response.json({ message: "Purchase order has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the purchaseorder controller for use in routes
module.exports = purchaseorderController;