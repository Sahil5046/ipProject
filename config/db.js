const mongoose = require("mongoose")
const colors = require('colors')
const dotenv = require('dotenv').config()

// Connect to MongoDB Database

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        .then(() => console.log("mongo connected...!"))
        .catch((error) => console.log("mongo connect error: ", error ))
        console.log(`MongoDb connected ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDB server issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB