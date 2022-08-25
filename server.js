const express = require("express");
require('dotenv').config()
const cors = require("cors");
const bodyParser = require("body-parser");
const chairmanRoute = require("./src/routes/ChairmanRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/api/", chairmanRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on Port 5000");
});