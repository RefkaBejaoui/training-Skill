const mongoose = require("mongoose");


const scoreSchema = new mongoose.Schema({
  checkPointScore: { type: ent, required: true },
 assessementScore: { type: String , require: true },
});

const Score = mongoose.model("score", scoreSchema);
module.exports = Score;