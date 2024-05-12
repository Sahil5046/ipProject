const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController} = require('../controllers/doctorCtrl')

// post | get doctor info
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// post | update doctor profile
router.post('/updateProfile', authMiddleware, updateProfileController)

//post get single DOC info
router.post('/getDoctorById', authMiddleware, getDoctorByIdController)

// get appointments
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController)

// post Update status
router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router