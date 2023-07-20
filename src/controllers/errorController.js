const AppError = require('../utils/appError');

const handleCastError = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value instead!`;
  return new AppError(message, 400);
}

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${errors.join(' ')}`;
  return new AppError(message, 400);
}

const handleJsonWebTokenError = () => {
  return new AppError("Invalid token", 401);
}

const handleTokenExpiredError = () => {
  return new AppError("Token expired", 401);
}

const classifyErrorType = err => {
  if (err.name === 'CastError') return handleCastError(err);
  if (err.name === 'ValidationError') return handleValidationError(err);
  if (err.code === 11000) return handleDuplicateFieldsDB(err);
  if (err.name === 'JsonWebTokenError') return handleJsonWebTokenError();
  if (err.name === 'TokenExpiredError') return handleTokenExpiredError();
  return err;
}

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    // error: err,
    message: err.message,
    // stack: err.stack,
  });
}

const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development') {
    const error = classifyErrorType(err);
    sendErrorForDev(error, res);
  } else if(process.env.NODE_ENV === 'production') {
    const error = classifyErrorType(err);
    sendErrorForProd(error, res);
  } else {
    const error = classifyErrorType(err);
    sendErrorForDev(error, res);
  }
}