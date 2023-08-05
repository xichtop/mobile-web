const Product = require('../models/product');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

// Alias Start - A type of middleware
exports.aliasTopProduct = (req, res, next) => {
  req.query.sort = '-sold';
  next();
}

// Function start
exports.getProducts = catchAsyncFn(async (req, res, next) => {
  const length = await Product.countDocuments();
  const features = new APIFeatures(Product.find(), req.query, length)
    .doFilter()
    .doSort()
    .limitField()
    .doPaginate();
  const products = await features.query;
  res
    .status(200)
    .json({
      status: 'successful',
      length: products.length,
      data: products
    })
});

exports.createProduct = catchAsyncFn(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res
    .status(200)
    .json({
      status: 'successful',
      data: newProduct
    });
});

exports.getProduct = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("reviews");
  if (!product) {
    const message = `Can not find product with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful',
    data: product
  })
});

exports.updateProduct = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const newProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!newProduct) {
    const message = `Can not find product with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res
    .status(200)
    .json({
      status: 'successful',
      data: newProduct
    });
})

exports.deleteProduct = catchAsyncFn(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    const message = `Can not find product with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful'
  });
})

exports.getProductGroup = catchAsyncFn(async (req, res, next) => {
  const product = await Product.aggregate([
    {
      $group: {
        _id: '$ratingAverage',
        countProduct: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
        totalSold: { $sum: '$sold' }
      }
    }
  ]);
  res.status(200).json({
    status: 'successful',
    data: product
  })
})

exports.getProductColor = catchAsyncFn(async (req, res, next) => {
  const products = await Product.aggregate([
    { $unwind: '$colors' },
    {
      $match: {
        "colors.price": { $gte: 780000 } //using like this for object (document nested object)
      }
    },
    { $project: { "__v": 0 } }
  ]);
  res.status(200).json({
    status: 'successful',
    length: products.length,
    data: products
  });
});
