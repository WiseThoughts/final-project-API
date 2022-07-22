const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./model");

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
				{ password: req.user.newPassword }
			);
			res.send({ user });
		}
		// send the result of the update command
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

exports.updateUserDetails = async (req, res) => {
	try {
	const editUser = await User.updateOne(
		req.body.filterObj,
		req.body.updateObj
	);
	res.send({ user: editUser });
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

exports.listUser = async (req, res) => {
    try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
        throw new Error("No user found");
    } else {
        res.send({ user });
    }
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};

exports.findAll = async (req, res) => {
    try {
    const users = await User.find(req.body);
    if (!users) {
        throw new Error("User not found");
    } else {
        res.send({ users });
    }
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};


exports.updatePassword = async (req, res)=>{
    try{
        const updatePassword = await User.updateOne({username: req.body.username}, {$set:{password: req.body.password}});
        res.send({updatePassword, message: `updated password for ${req.body.username}`});
    }catch(error){
        console.log(error)
        res.send({error, message:"update password error"})
    }
};