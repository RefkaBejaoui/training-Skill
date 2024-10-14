const mongoose = require("mongoose");


const checkPointSchema = new mongoose.Schema({
  title: { type: String, },
  task: { type: String },
  image: { type: String },
  question: { type: String },
});

const CheckPoint = mongoose.model("checkPoint", checkPointSchema);
module.exports = CheckPoint;
