const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

const generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.signUp = catchAsyncFn(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = generateToken(user._id);
  res.status(201).json({
    status:'success',
    data: {
      user,
      token
    },
  });
});

exports.logIn = catchAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password is required', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or passsword', 401));
  }
  delete user.password;

  const token = generateToken(user._id);
  res.status(200).json({
    status:'success',
    data: {
      user, token
    }
  });
});

exports.protect = catchAsyncFn(async (req, res, next) => {
  // 1) Getting the token and checking
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return next(new AppError('No token provided', 401))
  }
  // 2) Verifying the toekn - using promisify to return a promise so that we can using async/await
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('The user belonging to this token dose no longer exist', 401));
  }

  // 4) Check if user changed their password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Your password has changed since you last logged in', 401));
  }

  req.user = user;
  next();
});