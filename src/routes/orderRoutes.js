const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const orderDetailRoutes = require('../routes/orderDetailRoutes');

const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(authController.protect, orderController.getOrders)
  .post(authController.protect, orderController.getUserId, orderController.createOrder)

router
  .route('/:id')
  .get(authController.protect, orderController.getOrder)
  .patch(authController.protect, orderController.updateOrder)
  .delete(authController.protect, authController.restrictTo('admin'), orderController.deleteOrder);

router.use('/:orderId/order-details', orderDetailRoutes);

module.exports = router;