const mongoose = require("mongoose");

// Define the listing schema
const listingSchema = new mongoose.Schema({
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	startingPrice: {
		type: Number,
		default: 0,
	},
	currentPrice: {
		type: Number,
	},
	category: {
		type: String,
		default: "Not Specified",
	},
	condition: {
		type: String,
		default: "Not Specified",
	},
	description: {
		type: String,
	},
	imageURL: {
		type: String,
	},
});

// Map the schema to a model
const Listing = mongoose.model("Listing", listingSchema);

// export the model
module.exports = Listing;
