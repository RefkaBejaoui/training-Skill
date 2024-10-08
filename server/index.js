const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./DB/mongoose");
connectDB();

app.use(express.json());

// const routerCouse = require("./routes/course")
// app.use("/course", routerCouse)

const router = require("./routes/user");
app.use("/user", router);


app.listen(process.env.PORT, (err) => {
  err
    ? console.error("server failed", err)
    : console.log(
        `server is connected on http://localhost:${process.env.PORT}`
      );
});
