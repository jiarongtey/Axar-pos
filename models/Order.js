const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderScheme = new Schema({
  reseller: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("orders", OrderScheme);
