const mongoose = require("mongoose");

// Define the users schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true,
	},
	email: {
		type: String,
		unique: true,
		require: true,
	},
	pass: {
		type: String,
		required: true,
	},
});

// Map the schema to a model
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;
