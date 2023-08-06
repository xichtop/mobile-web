const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRoutes = require('../routes/reviewRoutes');

const router = express.Router({ mergeParams: true});

// router.param('id', productController.checkID);

router
  .route('/top-sold').get(productController.aliasTopProduct, productController.getProducts);

router
 .route('/get-by-group').get(productController.getProductGroup);
router
 .route('/get-by-color').get(productController.getProductColor);

router
  .route('/')
  .get(productController.getProducts)
  .post(authController.protect, authController.restrictTo('admin'), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(authController.protect, authController.restrictTo('admin'), productController.updateProduct)
  .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct);

router.use('/:productId/reviews', reviewRoutes);

module.exports = router;