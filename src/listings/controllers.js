const ListingSchema = require("./model");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.addListing = async (req, res) => {
	try {
		//Route: /sell

		// Body must be:
		// {
		// authorId: [user id from token] (Use Middleware to grab the user ID from request)
		// name: [String containing the title of the listing]
		// startingPrice: [Initial numerical price of the listing]
		// category: [A string containing the category (e.g "Cars", "Toys", etc.)]
		// condition: [A string briefly explaining its condition (e.g "New", "Used", "Spares and repairs")]
		// description: [A string containing user input describing the listing]
		// }

		// Ensure that the user is logged in
		if (!req.body.authorId) {
			throw new Error("No user logged in, listing cannot be submitted.");
		}
		// Ensure that the user has input a name for the listing
		if (!req.body.name) {
			throw new Error(
				"Title not specified, please enter a name for your listing"
			);
		}
		// Set the current price based off the user inputted starting price.
		req.body.currentPrice = req.body.startingPrice;

		const newListing = await ListingSchema.create(req.body);

		res.send({ listing: newListing });
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.listings = async (req, res) => {
	try {
		//Route: /shop

		// Body must be:
		//  {
		//     (optional) maxPrice: [some number],
		//     (optional) name: "some string",
		//     (optional) category: "some string",
		//     (optional) condtion: "some string"
		//  }

		// Set parameters based on provided fields:
		let param = [];
		if (req.body.maxPrice) {
			param.push({ currentPrice: { $lt: req.body.maxPrice } });
		}
		if (req.body.name) {
			param.push({ name: { $regex: req.body.name } });
		}
		if (req.body.category) {
			param.push({ category: { $regex: req.body.category } });
		}
		if (req.body.condition) {
			param.push({ condition: { $regex: req.body.condition } });
		}

		// Ensure that the listings are still available:
		param.push({ listingEnds: { $gt: Date.now() } });

		// Search for listings that meet ALL the conditions set by the user
		const listOfProducts = await ListingSchema.find({ $and: param });
		res.send({ products: listOfProducts });
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.updateListing = async (req, res) => {
	try {
		// Route: /edit

		// Body must be:
		// {
		//      listingId: [Id of an existing listing],
		//      (optional) name: [String with a new name for the listing],
		//      (optional) buyNowPrice: [New number to update the buy it now price with],
		//      (optional) description: [String with a new description for the listing],
		// }
		
		let $set = {};
		if (req.body.name) {
			$set.name = req.body.name;
		}
		if (req.body.buyNowPrice) {
			$set.buyNowPrice = req.body.buyNowPrice;
		}
		if (req.body.description) {
			$set.description = req.body.description;
		}

		console.log($set);
		const post = await ListingSchema.updateOne(
			{ _id: req.body.listingId },
			{ $set }
		);

		res.send({ listing: post });
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};
