const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRoutes = require('../routes/reviewRoutes');

// router.param('id', productController.checkID);

router
  .route('/top-sold').get(authController.protect, productController.aliasTopProduct, productController.getProducts);

router
 .route('/get-by-group').get(authController.protect, productController.getProductGroup);
router
 .route('/get-by-color').get(productController.getProductColor);

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct);

router.use('/:productId/reviews', reviewRoutes);

module.exports = router;