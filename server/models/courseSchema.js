const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lesson1: { type: String},
  video: { type: String },
  image: { type: String },
  lesson2: { type: String },
});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;
