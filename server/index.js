const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./DB/mongoose");
connectDB();

app.use(express.json());

const routerStudent = require("./routes/student");
app.use("/student", routerStudent);

// const routerCouse = require("./routes/course")
// app.use("/course", routerCouse)

const routerAdmin = require("./routes/admin");
app.use("/admin", routerAdmin);

// const router = require("./routes")
// app.use ("/" , router)

app.listen(process.env.PORT, (err) => {
  err
    ? console.error("server failed", err)
    : console.log(
        `server is connected on http://localhost:${process.env.PORT}`
      );
});
