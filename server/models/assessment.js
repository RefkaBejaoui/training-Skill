const mongoose = require("mongoose");


const assessementSchema = new mongoose.Schema({
  question: { type: String },
  response: { type: String,required: true },
  correction: { type: String },
});

const Assessement = mongoose.model("assessement", assessementSchema);
module.exports = Assessement;