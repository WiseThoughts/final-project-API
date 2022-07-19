const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create user
exports.signUp = async (req, res) => {
	try {
		// req.body contains k/v pairs that match the User model
		const newUser = await User.create(req.body);
		const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
		res.send({ user: newUser, token });
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

// Read/Check if user exists
exports.login = async (req, res) => {
	try {
		if (!req.user) {
			throw new Error("Invalid credentials");
		} else {
			// auth succeeded
			console.log(`${req.user.username} has logged in`);
			res.send({ user: req.user.username });
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.changePassword = async (req, res) => {
	try {
		// Check if the middleware has authenticated the request based on current password
		if (!req.user) {
			throw new Error("Invalid credentials");
		} else {
			// search database for record matching provided request body, store it to variable
			// Then set the password hashed by the middleware
			const user = await User.updateOne(
				{ username: req.body.username },
				{ pass: req.user.newPass }
			);
			res.send({ user });
		}
		// send the result of the update command
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		if (!req.user) {
			throw new Error("Invalid credentials");
		} else {
			const user = await User.deleteOne({
				$and: [{ username: req.user.username }, { email: req.user.email }],
			});
			res.send({ user });
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};
