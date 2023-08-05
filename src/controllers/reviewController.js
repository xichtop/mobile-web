const Review = require('../models/review');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

exports.getReviews = catchAsyncFn(async (req, res, next) => {
  const length = await Review.countDocuments();
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId};
  const features = new APIFeatures(Review.find(filter), req.query, length)
    .doFilter()
    .doSort()
    .limitField()
    .doPaginate();
  const reviews = await features.query;
  res
    .status(200)
    .json({
      status: 'successful',
      length: reviews.length,
      data: reviews
    })
});

exports.createReview = catchAsyncFn(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res
    .status(200)
    .json({
      status: 'successful',
      data: newReview
    });
});