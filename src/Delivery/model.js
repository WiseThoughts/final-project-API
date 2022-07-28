const mongoose = require("mongoose");

const delivSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addressline1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  postcode: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  preference: {
    type: Boolean,
  },
});

const Delivery = mongoose.model("Delivery", delivSchema);

module.exports = Delivery;
