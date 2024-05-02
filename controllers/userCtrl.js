const userModel = require("../models/userModels.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

const authController = async(req, res) => {
    try{
     const user = await userModel.findById({_id:req.body.userId});
     user.password = undefined;
     if(!user){
      return res.status(200).send({
      message: 'user not found',
      success:false
     })
    }else{
     res.status(200).send({
      success: true,
      data: user
     });
    }
   } catch (error){
     console.log(error)
     res.status(500).send({
        message: 'auth error',
        success:false,
        error
     })
   }
 };

module.exports = { loginController, registerController, authController }