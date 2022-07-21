// const bcrypt = require("bcryptjs");
const Delivery = require("./model");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createDel = async (req, res) => {
  try {
    // req.body contains k/v pairs that match the User model
    const newDelivery = await Delivery.create(req.body);
    res.send({ Delivery: newDelivery });
    console.log(res.send());
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
exports.findDel = async (req, res) => {
  try {
    const delivery = await Delivery.find({ name: req.params.name });
    if (!delivery) {
      throw new Error("User not found");
    } else {
      res.send({ Delivery: delivery });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
exports.findDels = async (req, res) => {
	try {
	  const deliveries = await Delivery.find(req.body);
	  if (!deliveries) {
		throw new Error("User not found");
	  }
		else{
	  res.send({ Delivery: deliveries });}
	} catch (error) {
	  console.log(error);
	  res.send({ error });
	}
  };


exports.deleteDel = async (req, res) => {
  try {
    const delDeliv = await Delivery.deleteOne({ name: req.params.name });
    res.send({ Delivery: delDeliv });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.updateDel = async (req, res) => {
  try {
    const editDel = await Delivery.updateOne(
      req.body.filterObj,
      req.body.updateObj
    );
    res.send({ Delivery: editDel });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
