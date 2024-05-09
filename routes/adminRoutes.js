const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersControllers, getAllDoctorsControllers, changeAccountStatusController } = require('../controllers/adminctrl')
const router = express.Router()

// get | users
router.get('/getAllUsers', authMiddleware, getAllUsersControllers)
// get | doctor
router.get('/getAllDoctors', authMiddleware, getAllDoctorsControllers)

// post | account status change
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
module.exports = router