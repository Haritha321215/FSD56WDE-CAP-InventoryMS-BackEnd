		// require mongoose
		const mongoose = require("mongoose");
		// create a schema
		const userSchema = new mongoose.Schema({
		  username: String,
		  passwordHash: String,
		  name: String,
		  location: {
		    type: String,
		    default: "unknown",
		  },
		  role: {
		    type: String,
		    enum: ["user", "admin"],
		    default: "user",
		  },
		});
		// create a model and export it
		// User is model, users is collection
module.exports = mongoose.model("User", userSchema, "users");