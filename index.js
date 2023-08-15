const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
var cors = require('cors')
const { rateLimit, MemoryStore } = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const productRouter = require('./src/routes/productRoutes');
const userRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const categoryRouter = require('./src/routes/categoryRoutes');
const reviewRouter = require('./src/routes/reviewRoutes');
const orderRouter = require('./src/routes/orderRoutes');
const orderDetailRouter = require('./src/routes/orderDetailRoutes');

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

// 1. Middleware

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again in 15 minutes!',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	store: new MemoryStore(),
})
app.use('/api/v1', apiLimiter);

//middleware to make req body into json // make body request not undefined
app.use(express.json({
  replaceWith: '_',
})); 

app.use(mongoSanitize());

// 2. Route
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
// app.use('/api/v1/order-details', orderDetailRouter);

// return error when call to unknown route
app.all('*', (req, res, next) => {
  const message = `Can't find ${req.originalUrl} on this server`;
  next(new AppError(message, 404));
})

// Middle where for return error messages
app.use(globalErrorHandler);

module.exports = app;
