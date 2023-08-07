const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(authController.protect, cartController.getCarts)
  .post(authController.protect, cartController.getUserId, cartController.createCart)

router
  .route('/:id')
  .get(authController.protect, cartController.getCart)
  .patch(authController.protect, cartController.updateCart)
  .delete(authController.protect, cartController.deleteCart);

module.exports = router;