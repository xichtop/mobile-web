const OrderDetail = require('../models/orderDetail');
const handlerFactory = require('./handlerFactory');

exports.getOrderId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.order) req.body.order = req.params.orderId;
  next();
}

exports.getOrderDetails = handlerFactory.getAll(OrderDetail);
exports.getOrderDetail = handlerFactory.getOne(OrderDetail);
exports.createOrderDetail = handlerFactory.createOne(OrderDetail);
exports.updateOrderDetail = handlerFactory.updateOne(OrderDetail);
exports.deleteOrderDetail = handlerFactory.deleteOne(OrderDetail);