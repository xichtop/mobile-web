const User = require('../models/user');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

// Function start
exports.getUsers = catchAsyncFn(async (req, res, next) => {
  const length = await User.countDocuments();
  const features = new APIFeatures(User.find(), req.query, length)
    .doFilter()
    .doSort()
    .limitField()
    .doPaginate();
  const users = await features.query;
  res
    .status(200)
    .json({
      status: 'successful',
      length: users.length,
      data: users
    })
});

exports.createUser = catchAsyncFn(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res
    .status(200)
    .json({
      status: 'successful',
      data: newUser
    });
});

exports.getUser = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    const message = `Can not find user with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful',
    data: user
  })
});

exports.updateUser = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const newUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!newUser) {
    const message = `Can not find user with id: ${id}`;
    return next(new AppError(message, 404));
  }
  
  res
    .status(200)
    .json({
      status: 'successful',
      data: newUser
    });
})

exports.deleteUser = catchAsyncFn(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    const message = `Can not find user with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful'
  });
})
