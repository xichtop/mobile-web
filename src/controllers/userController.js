const User = require('../models/user');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  });
  return newObj;
}

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
  if (req.body.password) {
    return next(new AppError('This route is not for password update.', 400))
  }

  if (req.body.role) {
    return next(new AppError('This route is not for role update.', 400))
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  const newUser = await User.findByIdAndUpdate(req.user._id, filteredBody, { new: true, runValidators: true });
  
  res
    .status(200)
    .json({
      status: 'successful',
      data: newUser
    });
})

exports.deleteUser = catchAsyncFn(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'successful',
  })
})
