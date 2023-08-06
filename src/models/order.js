const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must have a user']
  },
  receiver: {
    type: String,
    required: [true, 'Order must have a receiver']
  },
  address: {
    type: String,
    required: [true, 'Order must have a address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Order must have a phone number']
  },
  discountPercent: {
    type: Number,
    default: 0
  },
  shippingMethod: {
    type: String,
    required: [true, 'Order must have a shipping method.']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Order must have a payment method.']
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Ordered', 'Accepted', 'Delivering', 'Delivered', 'Canceled'],
    default: 'Ordered'
  }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;