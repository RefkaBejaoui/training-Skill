const mongoose = require("mongoose");


const checkPointSchema = new mongoose.Schema({
  question: { type: String },
  options : {type:[String]},
  required : {type:Boolean, default:true},
  correctAnswer : {type: String}
});

const CheckPoint = mongoose.model("checkPoint", checkPointSchema);
module.exports = CheckPoint;
