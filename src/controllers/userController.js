const User = require('../models/user');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');
const handlerFactory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  });
  return newObj;
}

exports.createUser = catchAsyncFn(async (req, res, next) => {
  return next(new AppError('This route is not for create user. Please user auth/signup.', 400))
});

exports.updateMe = catchAsyncFn(async (req, res, next) => {
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

exports.deleteMe = catchAsyncFn(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'successful',
  })
})

exports.getUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);
