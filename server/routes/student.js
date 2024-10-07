const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/studentSchema");
const authorized = require("../middleware/authorized");
const Course = require("../models/courseSchema");

router.post("/loginStudent", async (req, res) => {
  try {
    const { studentName, studentPassword } = req.body;
    const student = await Student.findOne({studentName : studentName});
    //console.log(student)
    if (!student) {
      res.send({ msg: "you are not allowed" });
    } else {
    const allowed = await bcrypt.compare(studentPassword, student.studentPassword);
      if (!allowed) {
        res.send({ msg: "wrong password" });
      } else {
        const identification = {
          id: student._id,
        };
        const token = await JWT.sign(identification, "kkjdchlsdcb", 
          {expiresIn: "24h"}
    );
        res.send({ msg: "student is connected", student, token });
      }}
    } catch (error) {
    console.error(error);
  }}
);

router.get("/authorizedStudent", authorized, (req, res) => {
  res.send({ student: req.student });
});

router.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send({ msg: "this are all th courses", courses });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "An error in downloading the courses", error });
  }
});

module.exports = router;
