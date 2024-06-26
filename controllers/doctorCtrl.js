const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const userModel = require('../models/userModels')

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: requestAnimationFrame.body.userId})
        res.status(200).send({
            message: 'Doctor fetched successfully',
            success: true,
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        resizeBy.status(500).send({
            success: false,
            error,
            message: "didn't fetch doctor information"
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findByIdAndUpdate({userId: req.body.userId}, req.body);
        res.status(201).send({
            message: 'Doctor profile updated successfully',
            success: true,
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while updating profile"
        })
    }
}

// get single doctor
const getDoctorByIdController = async( req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message: "Single Docotor Info  fetched",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error in single doctor info'
        })
    }
}

const doctorAppointmentsController = async(req,res) =>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        const appointments = await appointmentModel.find({doctorId:doctor._id})
        res.status(200).send({
            success: true,
            message: "Doctor appointments fetch successfully",
            data: appointments,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          error,
          message: 'Error in Doc Appointments'  
        })
    }
}

const updateStatusController = async( req, res)=>{
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user = await userModel.findOne({_id: appointments.userId})
        const notification = user.notification;
        notification.push({
            type: "Status Updated",
            message: `your appointment has been updated ${status}`,
            onClickPath: '/doctor-appointments',
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "Approved status updated",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Update Status'
        })
    }
}

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController}