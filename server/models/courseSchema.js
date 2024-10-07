const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lesson: { type: String },
  video: { type: String },
  image: { type: String },
});

const Course = mongoose.model("couse", courseSchema);
module.exports = Course;
