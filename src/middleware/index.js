const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../user/model");
const SALT = 8;
exports.verifyEmail = async (req, res, next) => {
	try {
		console.log("verifyEmail...");
		const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
		// Regex checks for email format
		if (req.body.email) {
			if (regex.test(req.body.email)) {
				// Email is valid
				next();
			} else {
				throw new Error("Invalid email format.");
			}
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.hashPass = async (req, res, next) => {
	try {
		console.log("hashPass...");

		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 8); // Hash the password from req.body.pass, reasserting into req.body.pass
		}

		// If changing password:
		if (req.body.newPassword) {
			req.user.newPassword = await bcrypt.hash(req.body.newPassword, SALT); // Hash the password from req.body.newPass if it exists, reassert into req.body.newPass
		}

		next(); // Moves onto next middleware/controller in endpoint
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.comparePass = async (req, res, next) => {
	try {
		if (process.env.DEBUG) {
			console.log(`middleware/index.js:`);
			console.log(req.body);
			console.log(bcrypt);
		}
		// Lookup username OR email in database - Store it in req.user
		req.user = await User.findOne({ username: req.body.username });

		// Check the req.user password matches the req.body password
		if (await bcrypt.compare(req.body.password, req.user.password)) {
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
