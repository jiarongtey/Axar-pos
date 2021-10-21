const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  cost: {
    type: Number,
    require: true,
  },
  resell: {
    type: Number,
    require: true,
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
