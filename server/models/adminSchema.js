const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  adminPassword: { type: String, required: true },
  asminEmail: { type: String, required: true },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
