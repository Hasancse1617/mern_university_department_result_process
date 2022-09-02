const Dept = require("../models/Dept");

module.exports.fetchDept = async(req, res) =>{
    try {
        const response = await Dept.find().sort({short_name:'ascending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}