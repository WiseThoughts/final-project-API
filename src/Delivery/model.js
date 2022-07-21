const mongoose = require("mongoose");

const delivSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
 addressline1: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  postcode: {
    type: String,
  },
  cost: {
    type: Number,
  
  },
  preference: {
    type: Boolean,
  },
});

const Delivery = mongoose.model("Delivery", delivSchema);

module.exports = Delivery;
