// Business logic for inventory management

// Import the Inventory model
const Inventory = require("./inventoryModel");
const Product = require("../product/productModel");
const Stock = require("../stock/stockModel");
const PurchaseOrder = require("../purchaseOrder/purchaseorderModel");
const Order = require("../order/orderModel");

// Define the inventory controller
const inventoryController = {
  // Add a new inventory item
  addInventory: async (request, response) => {
    try {
      const { productName } = request.body;
      console.log(productName + " from request body");

      // Find the product by name in the product collection
      const product = await Product.findOne({ productName });
      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }
      console.log("Product found: " + product.productName);

      // Find the stock by name in the stock collection
      const stock = await Stock.findOne({ productName });
      if (!stock) {
        return response.status(404).json({ error: "Stock not found" });
      }
      console.log("Stock found: " + stock.stockQuantity);

      // Find the purchage order by name in the purchage order collection
      const purchaseOrder = await PurchaseOrder.findOne({ productName });
      if (!purchaseOrder) {
        return response.status(404).json({ error: "PurchaseOrder not found" });
      }
      console.log("PurchaseOrder found: " + purchaseOrder.quantity);

      // Find the order by name in the order collection
      const order = await Order.findOne({ productName });
      if (!order) {
        return response.status(404).json({ error: "Order not found" });
      }
      console.log("Order found: " + order.quantity);

      // Check if the inventory already exists in the database
      const inventory = await Inventory.findOne({ productName });
      if (inventory) {
        return response.status(400).json({ message: "Inventory already exists" });
      }

      // Calculate inventory details
      const openStock = stock.stockQuantity;
      const inStock = purchaseOrder.quantity; 
      const outStock = order.quantity; 
      const outStockPrice= order.total_amount;
      const closingStock = inStock + openStock - outStock;
      const stockRate = product.buying_price * closingStock;
      const stockValue = product.selling_price * closingStock;
      const reorder = product.reorder_level;
      const reorderRequired = reorder >= closingStock ? true : false;

      // Create a new inventory item
      const newInventory = new Inventory({
        productName: product.productName,
        drawer_number: product.drawer_number,
        openingStock: openStock,
        inStock: inStock,
        outStock: outStock,
        outStockPrice:outStockPrice,
        closingStock: closingStock,
        totalStockBuyingPrice: stockRate,
        totalStockSellingPrice: stockValue,
        min_quantity: stock.min_quantity,
        max_quantity: stock.max_quantity,
        reorder_level: reorder,
        reorder_required: reorderRequired,
      });

      // Save the inventory in the database
      const saveInventory = await newInventory.save();
      await Inventory.collection.dropIndexes();

      // Return the saved inventory response to the frontend
      response.status(201).json({
        message: "Inventory created successfully",
        inventory: saveInventory,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Get an inventory item by ID
  getInventoryById: async (request, response) => {
    try {
      // Get the inventory ID from the request object
      const inventoryId = request.params.inventoryId;

      // Find the inventory by ID in the database
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }

      // Return the found inventory
      response.json({ message: "Inventory found", inventory });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Get all inventory items
  getInventories: async (request, response) => {
    try {
      // Find all inventory items in the database
      const inventories = await Inventory.find();
      if (!inventories) {
        return response.status(400).json({ message: "Inventories not found" });
      }

      // Return the found inventories
      response.json({ message: "Inventories found", inventories });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Update an inventory item by ID
  updateInventoryById: async (request, response) => {
    try {
      // Get the inventory ID from the request object
      const inventoryId = request.params.inventoryId;

      // Get the new inventory details from the request body
      const { inventoryName } = request.body;

      // Find the inventory by ID in the database
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }

      // Update the inventory details if they exist
      if (inventoryName) inventory.inventoryName = inventoryName;

      // Save the updated inventory to the database
      const updatedInventory = await inventory.save();

      // Return the updated inventory to the frontend
      response.json({
        message: "Inventory updated",
        inventory: updatedInventory,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Delete an inventory item by ID
  deleteInventoryById: async (request, response) => {
    try {
      // Get the inventory ID from the request object
      const inventoryId = request.params.inventoryId;

      // Find the inventory by ID in the database
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        return response.status(400).json({ message: "Inventory not found" });
      }

      // Delete the found inventory item
      await inventory.deleteOne();

      // Return a success message
      response.json({ message: "Inventory has been deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = inventoryController; 