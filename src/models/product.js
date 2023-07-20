const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product must have a title"],
    unique: [true, "Title must be unique"]
  },
  description: {
    type: String,
    required: [true, "Product must have a description"]
  },
  urlPicture: {
    type: String,
    required: [true, "Product must have a urlPicture"]
  },
  sold: {
    type: Number,
    default: 0,
    min: 0
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  colors: [{
    color: String,
    price: Number,
    urlPicture: String
  }],
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  ratingQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  createAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  modifyAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: Boolean,
    default: true
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;