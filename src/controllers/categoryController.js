const Category = require('../models/category');
const catchAsyncFn = require('../utils/catchAsyncFn');
const handlerFactory = require('./handlerFactory');
// const catchAsyncFn = require('../utils/catchAsyncFn');

exports.getCategoryBySortCode = catchAsyncFn(async function (req, res, next) {
  const category = await Category.findOne({sortCode: req.params.sortCode});
  res
    .status(200)
    .json({
      status: 'successful',
      data: category
    });
})

exports.getCategories = handlerFactory.getAll(Category);
exports.getCategory = handlerFactory.getOne(Category);
exports.createCategory = handlerFactory.createOne(Category);
exports.updateCategory = handlerFactory.updateOne(Category);
exports.deleteCategory = handlerFactory.deleteOne(Category);
