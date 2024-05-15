const userModel = require("../models/userModels.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel.js')
const appointmentModel = require('../models/appointmentModel.js')
const moment = require('moment')

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid password', success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);

        return res.status(200).send({ message: 'Login successful', success: true, token });
    } catch (error) {
        console.log(`Error in loginController: ${error}`);
        return res.status(500).send({ message: 'Error in login controller', error: error.toString() });
    }
};




const registerController = async (req, res) => {
    try {
        console.log(req.body)
        const existingUser = userModel.findOne({ email: req.body.email })

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: 'user already exist'
            })
        }

        //password encryption
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: 'Register successfully', success: true })
    } catch (error) {
        console.log(`Error on register controller: ${error}`)
        res.status(500).send({
            success: false,
            message: `Register controller  error: ${error.message}`
        })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
};


const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        console.log("Notification: ", notification);
        notification.push({ 
            type: 'Apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: { 
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: 'Doctor account applied successfully'
        })

    } catch (error) {
        console.log("Error: ",error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for doctor'
        })
    }
}

// notifications controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        console.log(user);
        const seennotification = await user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'all notifications marked as read' ,
            data: updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error while getting notifications',
            success: false,
            error: error
        })
    }
}

// delete notfication
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        user.notification = []
        user.seennotification = []
        const updateUser = await user.save()
        updateUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'all notifications deleted' ,
            data: updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error while deleting notifications',
            success: false,
            error: error
        })
    }
}

// get all DOC
const getAllDoctorsController = async(req,res)=>{
	try{
		const doctors = await doctorModel.find({status:'approved'})
		res.status(200).send({
			success:true,
			message:"Doctors Lists Fetched Success",
			data:doctors,
		})
		
	} catch(error){
        console.log(error)
		res.status(500).send({
			success: false,
			error,
			messsage: "Error while fetching doc"
		})
	}
}

// book appointment
const bookAppointmentController = async(req,res) =>{
    try {
        req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save();
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type: "New-appointment-request",
            message: `A new appointment request from ${req.body.userInfo.username}`,
            onClickPath: '/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success:true,
            message: 'Appointment Book successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while booking appointment'
        })
    }
}

// bookingAvailabilityController
const bookingAvailabilityController = async(req,res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1,'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1,'hours').toISOString()
        const doctorId = req.body.doctorId
        const appoinments = await appointmentModel.find({
            doctorId,
            date,
            time:{
               $gte:fromTime, 
               $lte:toTime,
            }
        })
        if(appoinments.length>0){
            return res.status(200).send({
                message: 'Appointment not available at this time',
                success: true,
            });

        }else{
            return res.status(200).send({
                success: true,
                message: 'Appointment available'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in booking"
        })
    }
}

// userAppointmentsController

const userAppointmentsController = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message: 'Users appointment fetch successfully',
            data: appointments 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in user-appointments"
        })
    }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController }