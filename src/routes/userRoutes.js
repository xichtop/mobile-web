const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect,  userController.getUsers)
  .post(userController.createUser);

router.patch('/update-me', authController.protect, userController.updateUser);
router.delete('/delete-me', authController.protect, userController.deleteUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  // .patch(userController.updateUser)
  // .delete(userController.deleteUser);


module.exports = router;