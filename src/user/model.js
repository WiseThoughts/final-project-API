const mongoose = require("mongoose");

// Define the users schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true,
	},
    name: {
        type: String,
        unique: false,
    },
	email: {
		type: String,
		unique: true,
		require: true,
	},
	password: {
		type: String,
		required: true,
	},
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    postcode: {
        type: String,
    },
});

// Map the schema to a model
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;
