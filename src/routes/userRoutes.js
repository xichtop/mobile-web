const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin'), userController.getUsers)
  .post(userController.createUser);

router.patch('/update-me', authController.protect, userController.updateMe);
router.delete('/delete-me', authController.protect, userController.deleteMe);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);


module.exports = router;