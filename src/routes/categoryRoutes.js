const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory);


module.exports = router;