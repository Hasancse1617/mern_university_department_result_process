const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const cors = require("cors");
const connectDB = require("./src/config/db");
const chairmanRoute = require("./src/routes/ChairmanRoute");

const app = express();
connectDB();
app.use(cors());

app.use(express.static('public'));
app.use("/api/", chairmanRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on Port 5000");
});