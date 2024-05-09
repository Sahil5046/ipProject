const express = require('express');
// const authMiddleware = require("../middlewares/authMiddleware.js")
const{
  loginController,
  registerController,
  applyDoctorController,
  authController,
  getAllNotificationController, deleteAllNotificationController
 } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/getUserData", authMiddleware, authController);

router.post("/apply-doctor", authMiddleware, applyDoctorController);

// notifiction || post
router.post('/get-all-notifications', authMiddleware, getAllNotificationController)

// notifiction || post
router.post('/delete-all-notifications', authMiddleware, deleteAllNotificationController)

module.exports = router;