const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required'],
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false,
    },
    notification:{
        type:Array,
        default:[],
    },
    seennotification:{
        type:Array,
        default:[],
    },
});


const usermodel = mongoose.model("User", userSchema)
module.exports = usermodel;