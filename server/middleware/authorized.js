const JWT = require("jsonwebtoken")
const Student = require("../models/studentSchema")


const authorized = async (req,res , next) => {
    const token = req.headers["autorisation"]
    if(!token) {
        res.send({msg:"Sorry there is no token"})
    }
    else {
        const verifiedToken = await JWT.verify(token, "kkjdchlsdcb" )
    const student = await Student.findById(verifiedToken.id)
    if(student) {
        req.student = student
        next();
    }
    }
}
module.exports = authorized;