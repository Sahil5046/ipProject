const express = require("express")
const colors = require('colors')
const morgan = require('morgan')
const env = require('dotenv')
const connectDB = require("./config/db")
const cors = require('cors')


//mongodb connection
connectDB();

const app = express();


env.config();
app.use(morgan('dev'));
// parse request of content type - application/json
app.use(express.json());


var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions)) //for handling cross-origin requests


//routes
app.use("/api/v1/user", require("./routes/userRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"))
app.use('/api/v1/doctor', require('./routes/doctorRoutes'))



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white)
})