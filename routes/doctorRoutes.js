const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const {getDoctorInfoController, updateProfileController} = require('../controllers/doctorCtrl')

// post | get doctor info
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// post | update doctor profile
router.post('/updateProfile', authMiddleware, updateProfileController)

module.exports = router