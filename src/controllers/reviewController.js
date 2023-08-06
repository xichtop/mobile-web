const Review = require('../models/review');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');
const handlerFactory = require('./handlerFactory');

exports.getProductAndUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getReviews = handlerFactory.getAll(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.getReview = handlerFactory.getOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);