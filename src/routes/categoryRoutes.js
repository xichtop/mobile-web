const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const productRoutes = require('./productRoutes');

router.get('/get-by-code/:sortCode', categoryController.getCategoryBySortCode);

router
  .route('/')
  .get(categoryController.getCategories)
  .post(authController.protect, authController.restrictTo('admin'), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(authController.protect, authController.restrictTo('admin'), categoryController.updateCategory)
  .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory);

  router.use('/:categoryId/products', productRoutes);

module.exports = router;