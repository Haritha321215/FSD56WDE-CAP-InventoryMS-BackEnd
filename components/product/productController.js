// Import the Category, Product, and Vendor models
const Category = require("../category/categoryModel");
const Product = require("./productModel");
const Vendor = require("../vendor/vendorModel");

// Define the product controller
const productController = {
  // Add a new product
  addProduct: async (request, response) => {
    try {
      const {
        productName,
        description,
        category_name,
        buying_price,
        selling_price,
        unit,
        vendor_name,
        drawer_number,
        reorder_level,
      } = request.body;

      // Find the category by name in the category collection
      const category = await Category.findOne({ name: category_name });
      if (!category) {
        return response.status(404).json({ error: "Category not found" });
      }

      // Find the vendor by name in the vendor collection
      const vendor = await Vendor.findOne({ name: vendor_name });
      if (!vendor) {
        return response.status(404).json({ error: "Vendor not found" });
      }

      // Check if the product already exists in the database
      const product = await Product.findOne({ productName });
      if (product) {
        return response.status(400).json({ message: "Product already exists" });
      }

      // Create a new product object using the Product model
      const newProduct = new Product({
        productName,
        description,
        category: category.categoryName, // Assign the category Name
        buying_price,
        selling_price,
        unit,
        vendor: vendor.vendorName, // Assign the vendor Name
        drawer_number,
        reorder_level,
      });

      // Save the new product in the database
      const savedProduct = await newProduct.save();
      await Product.collection.dropIndexes(); // Drop indexes to ensure data integrity

      // Return the saved product response to the frontend
      response.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get a product by ID
  getProductById: async (request, response) => {
    try {
      // Get the product ID from the request parameters
      const productId = request.params.productId;

      // Find the product by ID in the database
      const product = await Product.findById(productId);

      // If the product does not exist, return an error response
      if (!product) {
        return response.status(400).json({ message: "Product not found" });
      }

      // If the product is found, return the product response
      response.json({ message: "Product found", product });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get all products
  getProducts: async (request, response) => {
    try {
      // Find all products in the database
      const products = await Product.find();

      // If no products are found, return an error response
      if (!products) {
        return response.status(400).json({ message: "Products not found" });
      }

      // If products are found, return the products response
      response.json({ message: "Products found", products });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Update a product by ID
  updateProductById: async (request, response) => {
    try {
      // Get the product ID from the request parameters
      const productId = request.params.productId;

      // Get the updated product details from the request body
      const {
        productName,
        description,
        category_name,
        buying_price,
        selling_price,
        unit,
        vendor_name,
        drawer_number,
        reorder_level,
      } = request.body;

      // Find the product by ID in the database
      const product = await Product.findById(productId);

      // If the product does not exist, return an error response
      if (!product) {
        return response.status(400).json({ message: "Product not found" });
      }

      // Update the product if the product exists
      if (productName) product.productName = productName;
      if (description) product.description = description;
      if (category_name) product.category = category_name
      if (buying_price) product.buying_price = buying_price;
      if (selling_price) product.selling_price = selling_price;
      if (unit) product.unit = unit;
      if (vendor_name) product.vendor = vendor_name;
      if (drawer_number) product.drawer_number = drawer_number;
      if (reorder_level) product.reorder_level = reorder_level;
    

      // Save the updated product to the database
      const updatedProduct = await product.save();

      // Return the updated product response to the frontend
      response.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Delete a product by ID
  deleteProductById: async (request, response) => {
    try {
      // Get the product ID from the request parameters
      const productId = request.params.productId;

      // Find the product by ID in the database
      const product = await Product.findById(productId);

      // If the product does not exist, return an error response
      if (!product) {
        return response.status(400).json({ message: "Product not found" });
      }

      // If the product is found, delete the product
      await product.deleteOne();

      // Return a success message
      response.json({ message: "Product has been deleted" });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the product controller for use in other parts of the application
module.exports = productController;
