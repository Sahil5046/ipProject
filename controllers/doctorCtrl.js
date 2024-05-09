const doctorModel = require('../models/doctorModel')

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

module.exports = {getDoctorInfoController, updateProfileController}