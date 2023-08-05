const Category = require('../models/category');
const handlerFactory = require('./handlerFactory');
// const catchAsyncFn = require('../utils/catchAsyncFn');

exports.getCategories = handlerFactory.getAll(Category);
exports.getCategory = handlerFactory.getOne(Category);
exports.createCategory = handlerFactory.createOne(Category);
exports.updateCategory = handlerFactory.updateOne(Category);
exports.deleteCategory = handlerFactory.deleteOne(Category);
