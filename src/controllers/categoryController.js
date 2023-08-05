const Category = require('../models/category');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

// Function start
exports.getCategories = catchAsyncFn(async (req, res, next) => {
  const length = await Category.countDocuments();
  const features = new APIFeatures(Category.find(), req.query, length)
    .doFilter()
    .doSort()
    .limitField()
    .doPaginate();
  const categories = await features.query;
  res
    .status(200)
    .json({
      status: 'successful',
      length: categories.length,
      data: categories
    })
});

exports.createCategory = catchAsyncFn(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res
    .status(200)
    .json({
      status: 'successful',
      data: newCategory
    });
});

exports.getCategory = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    const message = `Can not find category with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful',
    data: category
  })
});

exports.updateCategory = catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const newCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!newCategory) {
    const message = `Can not find category with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res
    .status(200)
    .json({
      status: 'successful',
      data: newCategory
    });
})

exports.deleteCategory = catchAsyncFn(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    const message = `Can not find Category with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful'
  });
})
