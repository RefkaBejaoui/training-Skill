const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.error("can not connect to the dataBase" ,err);
    });
};
module.exports = connectDB;
