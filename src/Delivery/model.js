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
    required: true,
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
  listing_id: {
type: mongoose.Schema.Types.ObjectId,
required: true
  },
  recipient_id:{
    type: mongoose.Schema.Types.ObjectId,
required: true
  }
});

const Delivery = mongoose.model("Delivery", delivSchema);

module.exports = Delivery;
