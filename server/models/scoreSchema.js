const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  studentScore: { type: Number, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  studentName : {type: String , required: true },
  studentResponsesId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Response' },
});

const Score = mongoose.model("score", scoreSchema);
module.exports = Score;
