const express = require('express');
const morgan = require('morgan');
const app = express();
const productRouter = require('./src/routes/productRoutes');
const userRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

// 1. Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware to make req body into json // make body request not undefined

// 2. Route
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

// return error when call to unknown route
app.all('*', (req, res, next) => {
  const message = `Can't find ${req.originalUrl} on this server`;
  next(new AppError(message, 404));
})

// Middle where for return error messages
app.use(globalErrorHandler);

module.exports = app;
