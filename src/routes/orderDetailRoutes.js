const express = require('express');
const authController = require('../controllers/authController');
const orderDetailController = require('../controllers/orderDetailController');

const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(authController.protect, orderDetailController.getOrderDetails)
  .post(authController.protect, orderDetailController.getOrderId, orderDetailController.createOrderDetail)

router
  .route('/:id')
  .get(authController.protect, orderDetailController.getOrderDetail)
  .patch(authController.protect, orderDetailController.updateOrderDetail)
  .delete(authController.protect, authController.restrictTo('admin'), orderDetailController.deleteOrderDetail);

module.exports = router;