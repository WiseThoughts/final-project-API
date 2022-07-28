const mongoose = require("mongoose");

// Define the listing schema
const listingSchema = new mongoose.Schema({
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
	},
	name: {
		type: String,
		// required: true,
	},
	startingPrice: {
		type: Number,
		default: 0,
		// Starts at 0 if nothing provided
	},
	currentPrice: {
		type: Number,
	},
	buyNowPrice: {
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
	listingBegins: {
		type: Date,
		default: () => Date.now(),
	},
	listingEnds: {
		type: Date,
		default: () => Date.now() + 14 * 24 * 60 * 60 * 1000,
	},
	sold: {
		type: Boolean,
		// required: true,
		default: false,
	},
	imageURL: {
		type: String,
	},
});

// Map the schema to a model
const Listing = mongoose.model("Listing", listingSchema);

// export the model
module.exports = Listing;
