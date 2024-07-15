// Import the Category model
const Category = require("./categoryModel");

// Define the category controller
const categoryController = {
  // Add a new category
  addCategory: async (request, response) => {
    try {
      const { categoryName, description } = request.body;

      // Check if the category already exists in the database
      const category = await Category.findOne({ categoryName });

      // If category exists, return an error response
      if (category) {
        return response.status(400).json({ message: "Category already exists" });
      }

      // If category does not exist, create a new category object and save it in the database
      const newCategory = new Category({
        categoryName,
        description,
      });

      // Save the new category in the database
      const saveCategory = await newCategory.save();
      await Category.collection.dropIndexes();

      // Return the saved category response to the frontend
      response.status(201).json({
        message: "Category created successfully",
        category: saveCategory,
      });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get a category by ID
  getCategoryById: async (request, response) => {
    try {
      // Get the category ID from the request object
      const categoryId = request.params.categoryId;

      // Find the category by ID in the database
      const category = await Category.findById(categoryId);

      // If the category does not exist, return an error response
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }

      // If the category is found, return the category response
      response.json({ message: "Category found", category });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get all categories
  getCategorys: async (request, response) => {
    try {
      // Find all categories in the database
      const categorys = await Category.find();

      // If no categories are found, return an error response
      if (!categorys) {
        return response.status(400).json({ message: "Categories not found" });
      }

      // If categories are found, return the categories response
      response.json({ message: "Categories found", categorys });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Update a category by ID
  updateCategoryById: async (request, response) => {
    try {
      // Get the category ID from the request object
      const categoryId = request.params.categoryId;

      // Get the updated category details from the request body
      const { categoryName, description } = request.body;

      // Find the category by ID in the database
      const category = await Category.findById(categoryId);

      // If the category does not exist, return an error response
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }

      // Update the category if the category exists
      if (categoryName) category.categoryName = categoryName;
      if (description) category.description = description;

      // Save the updated category to the database
      const updatedCategory = await category.save();

      // Return the updated category response to the frontend
      response.json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Delete a category by ID
  deleteCategoryById: async (request, response) => {
    try {
      // Get the category ID from the request object
      const categoryId = request.params.categoryId;

      // Find the category by ID in the database
      const category = await Category.findById(categoryId);

      // If the category does not exist, return an error response
      if (!category) {
        return response.status(400).json({ message: "Category not found" });
      }

      // If the category is found, delete the category
      await category.deleteOne();

      // Return a success message
      response.json({ message: "Category has been deleted" });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the category controller
module.exports = categoryController;