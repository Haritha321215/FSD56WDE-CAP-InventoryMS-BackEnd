// Import the Category model
const Inventory = require("../inventory/inventoryModel");

// Define the category controller
const reportsController = {
  // Add a new category

  // Get all categories
  generateInventoryReport: async (request, response) => {
    try {
      const totalStockLevel = await Inventory.aggregate([
        { $group: { _id: null, totalStock: { $sum: "$closingStock" } } },
      ]);

      const totalStockPrice = await Inventory.aggregate([
        {
          $group: { _id: null, totalrate: { $sum: "$totalStockBuyingPrice" } },
        },
      ]);

      const totalStockValue = await Inventory.aggregate([
        {
          $group: { _id: null, totalrate: { $sum: "$totalStockSellingPrice" } },
        },
      ]);      

      const reorderCount = await Inventory.countDocuments({ reorderLevel: true });

      const countOutOfStockItems = await Inventory.countDocuments({closingStock: { $lte: 0 } });
        
        

      response.status(200).json({ totalStockLevel, totalStockPrice, totalStockValue,reorderCount, countOutOfStockItems });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the category controller
module.exports = reportsController;

// currentStockValue
// currentStockCost
// currentStock
// reorders
// outofstocks
