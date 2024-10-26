const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./DB/mongoose");
const path = require("path")
connectDB();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, 'build')));

const routerCouse = require("./routes/course")
app.use("/course", routerCouse)

const routerUser = require("./routes/user");
app.use("/user", routerUser);

const routerCheckPoint = require("./routes/checkPoint");
app.use("/checkPoint", routerCheckPoint);

const routerScore = require("./routes/score");
app.use("/score", routerScore)

const routerResponse = require("./routes/response");
app.use("/response", routerResponse)

app.get('*' , (req,res) => {
  res.sendFile(path.join(__dirname,'build','index.html'))
})

app.listen(process.env.PORT, (err) => {
  err
    ? console.error("server failed", err)
    : console.log(
        `server is connected on http://localhost:${process.env.PORT}`
      );
});
