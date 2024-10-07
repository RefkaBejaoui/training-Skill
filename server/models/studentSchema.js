const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail : {
    type : String,
    required : true,
  },
  studentPassword : {
    type : String,
    required : true
  }
});
const Student = mongoose.model("student", studentSchema)
module.exports = Student
