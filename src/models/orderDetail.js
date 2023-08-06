const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: [true, 'Order detail must have an order.']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Order detail must have a product.']
  },
  color: {
    type: String,
    required: [true, 'Order detail must have a color.']
  },
  size: {
    type: String,
    required: [true, 'Order detail must have a size.']
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: [true, 'Order detail must have a price.'] 
  }
})

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;