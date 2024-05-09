const express = require('express');
// const authMiddleware = require("../middlewares/authMiddleware.js")
const{
  loginController,
  registerController,
  applyDoctorController,
  authController,
 } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/getUserData", authMiddleware, authController);

router.post("/apply-doctor", authMiddleware, applyDoctorController);

module.exports = router;