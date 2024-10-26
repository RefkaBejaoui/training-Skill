const JWT = require("jsonwebtoken")
const User = require("../models/userSchema")


const authorized = async (req, res, next) => {
    const token = req.headers["autorisation"]
    if(!token) {
        res.send({msg:"Sorry there is no token"})
    }
    else {
        const verifiedToken = await JWT.verify(token, "kkjdchlsdcb" )
    const user = await User.findById(verifiedToken.id)
    if(user) {
        req.user = user
        next();
    }
    }
}
module.exports = authorized;