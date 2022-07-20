const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../user/model");
const SALT = 8
exports.verifyEmail = async (req, res, next) => {
	try {
		const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
		// Regex checks for email format
		if (regex.test(req.body.email)) {
			// Email is valid
			next();
		} else {
			throw new Error("Invalid email format.");
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.hashPass = async (req, res, next) => {
	try {
		req.body.pass = await bcrypt.hash(req.body.pass, SALT); // Hash the password from req.body.pass, reasserting into req.body.pass

		// If changing password:
		if (req.body.newPass) {
			req.user.newPass = await bcrypt.hash(req.body.newPass, SALT); // Hash the password from req.body.newPass if it exists, reassert into req.body.newPass
		}

		next(); // Moves onto next middleware/controller in endpoint
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.comparePass = async (req, res, next) => {
	try {
		// Lookup username OR email in database - Store it in req.user
		req.user = await User.findOne({ username: req.body.username });

		// Check the req.user password matches the req.body password
		if (await bcrypt.compare(req.body.pass, req.user.pass)) {
			next(); // Move onto the next middleware/controller in endpoint
		} else {
			// If they do not match, throw a new error "Invalid login details"
			throw new Error("Invalid login details");
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.tokenCheck = async (req, res, next) => {
	try {
		// Decode token using secret key stored in .env file
		const decodedToken = jwt.verify(
			req.header("Authorization"),
			process.env.SECRET_KEY
		);

		// Find user by their ID stored in the token
		req.user = await User.findById(decodedToken.id);

		next();
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};



