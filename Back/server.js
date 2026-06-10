const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connect 
mongoose.connect("mongodb://127.0.0.1:27017/khalti");


//Routes
const paymentRoutes = require("./Routes/paymentRoutes");
app.use("/",paymentRoutes);



app.listen(5000,()=>{
    console.log("Server is running on PORT 5000 ..");
});