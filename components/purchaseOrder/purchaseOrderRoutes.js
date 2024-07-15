// Import the express router
const express = require("express");
const purchaseorderRouter = express.Router();
const purchaseorderController = require("./purchaseOrderController");
const auth = require("../../middleware/auth");

// Define the endpoints for purchase orders
purchaseorderRouter.post("/addpurchaseorder", auth.verifyToken, auth.isAdmin, purchaseorderController.addpurchaseorder);
purchaseorderRouter.get("/:purchaseorderId", auth.verifyToken, auth.isAdmin, purchaseorderController.getpurchaseorderById); 
purchaseorderRouter.get("/", auth.verifyToken, auth.isAdmin, purchaseorderController.getpurchaseorders); 
purchaseorderRouter.put("/:purchaseorderId", auth.verifyToken, auth.isAdmin, purchaseorderController.updatepurchaseorderById); 
purchaseorderRouter.delete("/:purchaseorderId", auth.verifyToken, auth.isAdmin, purchaseorderController.deletepurchaseorderById); 

// Export the router
module.exports = purchaseorderRouter;