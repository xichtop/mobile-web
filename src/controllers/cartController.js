const Cart = require('../models/cart');
const catchAsyncFn = require('../utils/catchAsyncFn');
const handlerFactory = require('./handlerFactory');

exports.getUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getCarts = handlerFactory.getAll(Cart);
exports.getCart = handlerFactory.getOne(Cart);
exports.createCart = handlerFactory.createOne(Cart);
exports.updateCart = handlerFactory.updateOne(Cart);
exports.deleteCart = handlerFactory.deleteOne(Cart);