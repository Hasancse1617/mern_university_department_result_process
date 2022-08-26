const express = require("express");
require('dotenv').config()
const cors = require("cors");
const connect = require("./src/config/db");
const bodyParser = require("body-parser");
const chairmanRoute = require("./src/routes/ChairmanRoute");

const app = express();
connect();
app.use(cors());
app.use(express.raw());
app.use(express.static('public'));
app.use("/api/", chairmanRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on Port 5000");
});