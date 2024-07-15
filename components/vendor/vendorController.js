// Import the Vendor model
const Vendor = require("./vendorModel");

// Define the vendor controller
const vendorController = {
  // Add a new vendor
  addVendor: async (request, response) => {
    try {
      const { vendorName, contact, address } = request.body;

      // Check if the vendor already exists in the database
      const vendor = await Vendor.findOne({ vendorName });

      // If vendor exists, return an error response
      if (vendor) {
        return response.status(400).json({ message: "Vendor already exists" });
      }

      // If vendor does not exist, create a new vendor object and save it in the database
      const newVendor = new Vendor({
        vendorName,
        contact,
        address,
      });

      // Save the new vendor in the database
      const saveVendor = await newVendor.save();
      await Vendor.collection.dropIndexes();

      // Return the saved vendor response to the frontend
      response.status(201).json({
        message: "Vendor created successfully",
        vendor: saveVendor,
      });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get a vendor by ID
  getVendorById: async (request, response) => {
    try {
      // Get the vendor ID from the request object
      const vendorId = request.params.vendorId;

      // Find the vendor by ID in the database
      const vendor = await Vendor.findById(vendorId);

      // If the vendor does not exist, return an error response
      if (!vendor) {
        return response.status(400).json({ message: "Vendor not found" });
      }

      // If the vendor is found, return the vendor response
      response.json({ message: "Vendor found", vendor });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Get all vendors
  getVendors: async (request, response) => {
    try {
      // Find all vendors in the database
      const vendors = await Vendor.find();

      // If no vendors are found, return an error response
      if (!vendors) {
        return response.status(400).json({ message: "Vendors not found" });
      }

      // If vendors are found, return the vendors response
      response.json({ message: "Vendors found", vendors });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Update a vendor by ID
  updateVendorById: async (request, response) => {
    try {
      // Get the vendor ID from the request object
      const vendorId = request.params.vendorId;

      // Get the updated vendor details from the request body
      const { vendorName, contact, address } = request.body;

      // Find the vendor by ID in the database
      const vendor = await Vendor.findById(vendorId);

      // If the vendor does not exist, return an error response
      if (!vendor) {
        return response.status(400).json({ message: "Vendor not found" });
      }

      // Update the vendor if the vendor exists
      if (vendorName) vendor.vendorName = vendorName;
      if (contact) vendor.contact = contact;
      if (address) vendor.address = address;

      // Save the updated vendor to the database
      const updatedVendor = await vendor.save();

      // Return the updated vendor response to the frontend
      response.json({ message: "Vendor updated", vendor: updatedVendor });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },

  // Delete a vendor by ID
  deleteVendorById: async (request, response) => {
    try {
      // Get the vendor ID from the request object
      const vendorId = request.params.vendorId;

      // Find the vendor by ID in the database
      const vendor = await Vendor.findById(vendorId);

      // If the vendor does not exist, return an error response
      if (!vendor) {
        return response.status(400).json({ message: "Vendor not found" });
      }

      // If the vendor is found, delete the vendor
      await vendor.deleteOne();

      // Return a success message
      response.json({ message: "Vendor has been deleted" });
    } catch (error) {
      // Handle any errors and return a server error response
      response.status(500).json({ message: error.message });
    }
  },
};

// Export the vendor controller
module.exports = vendorController;
