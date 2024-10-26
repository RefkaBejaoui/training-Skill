const mongoose = require("mongoose");


const checkPointSchema = new mongoose.Schema({
  question: { type: String },
  options : {type:[String]},
  correctAnswer : {type: [String]},
  correction : { type: String },
});

const CheckPoint = mongoose.model("checkPoint", checkPointSchema);
module.exports = CheckPoint;
