// Import the Mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the 'Vendor' model
const vendorSchema = new mongoose.Schema({
  vendorName: { 
    type: String, 
    required: true 
  }, // Name of the vendor, required field
  
  contact: { 
    type: String 
  }, // Contact information for the vendor, optional field
  
  address: { 
    type: String 
  }, // Address of the vendor, optional field

  // vendor supplies products
  // products_supplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  // List of products supplied by the vendor, referencing the 'Product' model
});

// Create a model from the schema
// The third argument specifies the name of the collection in the database ('vendors')
const Vendor = mongoose.model('Vendor', vendorSchema, 'vendors');

// Export the Vendor model for use in other parts of the application
module.exports = Vendor;