const Product = require('../models/product');
const catchAsyncFn = require('../utils/catchAsyncFn');
const handlerFactory = require('./handlerFactory');

// Alias Start - A type of middleware
exports.aliasTopProduct = (req, res, next) => {
  req.query.sort = '-sold';
  next();
}

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

exports.getProducts = handlerFactory.getAll(Product);
exports.getProduct = handlerFactory.getOne(Product, {path: 'reviews'});
exports.createProduct = handlerFactory.createOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
