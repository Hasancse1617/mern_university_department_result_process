const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const cors = require("cors");
const connectDB = require("./src/config/db");
const chairmanRoute = require("./src/routes/ChairmanRoute");
const teacherRoute = require("./src/routes/TeacherRoute");
const studentRoute = require("./src/routes/StudentRoute");
const examRoute = require("./src/routes/ExamRoute");
const commonRoute = require("./src/routes/CommonRoute");
const subjectRoute = require("./src/routes/SubjectRoute");
const markRoute = require("./src/routes/MarkRoute");

const app = express();
connectDB();
app.use(cors());

app.use(express.static('public'));
app.use("/api/", chairmanRoute);
app.use("/api/", teacherRoute);
app.use("/api/", studentRoute);
app.use("/api/", examRoute);
app.use("/api/", commonRoute);
app.use("/api/", subjectRoute);
app.use("/api/", markRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on Port 5000");
});