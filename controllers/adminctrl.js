const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')
const getAllUsersControllers = async () => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            data: users,
            message: 'users fetched successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while getting users'
        })
    }
}
const getAllDoctorsControllers = async () => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success: true,
            data: doctors,
            message: 'doctors fetched successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'errrors while getting doctors controllers'
        })
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user = await userModel.find({_id: doctor.userId})
        const notification = user.notification
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your doctor account status has been updated to ${status}`,
            onClickPath: '/notification'
        })
        user.isDoctor = status === 'approved' ? true : false 
        await userModel.save()
        res.status(200).send({
            success: true,
            message: 'account status changed successfully',
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error while changing account status',
            success: false,
            error: error
        })
    }
}

module.exports = {
    getAllUsersControllers,
    getAllDoctorsControllers,
    changeAccountStatusController
}