const Order = require('../models/order');
const handlerFactory = require('./handlerFactory');

exports.getUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getOrders = handlerFactory.getAll(Order);
exports.getOrder = handlerFactory.getOne(Order);
exports.createOrder = handlerFactory.createOne(Order);
exports.updateOrder = handlerFactory.updateOne(Order);
exports.deleteOrder = handlerFactory.deleteOne(Order);