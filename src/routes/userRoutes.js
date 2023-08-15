const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const orderRoutes = require('../routes/orderRoutes');
const cartRoutes = require('../routes/cartRoutes');

router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin'), userController.getUsers)
  .post(userController.createUser);

router.patch('/update-me', authController.protect, userController.updateMe);
router.delete('/delete-me', authController.protect, userController.deleteMe);
router.get('/get-me', authController.protect, userController.getMe);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

router.use('/:userId/orders', orderRoutes);
router.use('/:userId/carts', cartRoutes);

module.exports = router;