const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({

  
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  studentName : {type: String , required: true },
  checkPointQuestions:[{
    checkPointId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CheckPoint' },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: [String], required: true }
  }],
  studentResponses: { type: [[String]], required: true },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
