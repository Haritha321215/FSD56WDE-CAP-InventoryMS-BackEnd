// Import the Stock, and Product models
const Product = require("../product/productModel");
const Stock = require("./stockModel");
// Define the stock controller
const stockController = {
  // Add a new stock
  addStock: async (request, response) => {
    try {
      const { productName, stockQuantity, max_quantity } = request.body;
      console.log(productName);
      // Find the product by name in the stock collection
      const product = await Product.findOne({ productName: productName });
      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }

      // Check if the stock already exists in the database
      const stock = await Stock.findOne({ productName });
      if (stock) {
        return response.status(400).json({ message: "Stock already exists" });
      }
      const totalStockBuyingPrice = stockQuantity * product.buying_price;
      const totalStockSellingPrice = stockQuantity * product.selling_price;
      // Create a new stock object using the Stock model
      const newStock = new Stock({
        productName,
        stockQuantity,
        drawer_number: product.drawer_number,
        min_quantity: product.reorder_level,
        max_quantity,
        buying_price: product.buying_price,
        selling_price: product.selling_price,
        total_buying_price: totalStockBuyingPrice,
        total_selling_price: totalStockSellingPrice,
      });

      // Save the new stock in the database
      const savedStock = await newStock.save();
      await Stock.collection.dropIndexes(); // Drop indexes to ensure data integrity

      // Return the saved stock response to the frontend
      response.status(201).json({
        message: "Stock created successfully",
        stock: savedStock,
      });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get a stock by ID
  getStockById: async (request, response) => {
    try {
      // Get the stock ID from the request parameters
      const stockId = request.params.stockId;

      // Find the stock by ID in the database
      const stock = await Stock.findById(stockId);

      // If the stock does not exist, return an error response
      if (!stock) {
        return response.status(400).json({ message: "Stock not found" });
      }

      // If the stock is found, return the stock response
      response.json({ message: "Stock found", stock });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get all stocks
  getStocks: async (request, response) => {
    try {
      // Find all stocks in the database
      const stocks = await Stock.find();

      // If no stocks are found, return an error response
      if (!stocks) {
        return response.status(400).json({ message: "Stocks not found" });
      }

      // If stocks are found, return the stocks response
      response.json({ message: "Stocks found", stocks });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Update a stock by ID
  updateStockById: async (request, response) => {
    try {
      // Get the stock ID from the request parameters
      const stockId = request.params.stockId;

      // Get the updated stock details from the request body
      const {
        productName,
        stockQuantity,
        max_quantity,
      } = request.body;

      // Find the stock by ID in the database
      const stock = await Stock.findById(stockId);

      // If the stock does not exist, return an error response
      if (!stock) {
        return response.status(400).json({ message: "Stock not found" });
      }

      // Find the product by name in the stock collection
      const product = await Product.findOne({ productName: productName });
      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }
      // Update the stock if the stock exists
      const totalStockBuyingPrice = stockQuantity * product.buying_price;
      const totalStockSellingPrice = stockQuantity * product.selling_price;

      if (productName) stock.productName = product.productName;
      if (stockQuantity) stock.stockQuantity = stockQuantity;      
      stock.drawer_number = product.drawer_number;
      stock.min_quantity = product.reorder_level; 
      if (max_quantity) stock.max_quantity = max_quantity;     
      stock.buying_price = product.buying_price;
      stock.selling_price = product.selling_price;
      stock.total_buying_price=totalStockBuyingPrice;
      stock.total_selling_price=totalStockSellingPrice;

      // Save the updated stock to the database
      const updatedStock = await stock.save();

      // Return the updated stock response to the frontend
      response.json({ message: "Stock updated", stock: updatedStock });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Delete a stock by ID
  deleteStockById: async (request, response) => {
    try {
      // Get the stock ID from the request parameters
      const stockId = request.params.stockId;

      // Find the stock by ID in the database
      const stock = await Stock.findById(stockId);

      // If the stock does not exist, return an error response
      if (!stock) {
        return response.status(400).json({ message: "Stock not found" });
      }

      // If the stock is found, delete the stock
      await stock.deleteOne();

      // Return a success message
      response.json({ message: "Stock has been deleted" });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the stock controller for use in other parts of the application
module.exports = stockController;
