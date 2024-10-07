const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Course = require("../models/courseSchema");
const Student = require("../models/studentSchema");

router.post("/addCourse", async (req, res) => {
  try {
    const { title, lesson, video, image } = req.body;
    const newCourse = new Course({
      title: title,
      lesson: lesson,
      video: video,
      image: image,
    });
    await newCourse.save();
    res.send({ msg: "course added successfully", newCourse });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/deletCourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCouse = await Course.findByIdAndDelete(id);
    res.send({ msg: "cource deleted ", deletedCouse });
  } catch (error) {
    console.error(error);
  }
});

router.put("/updateCourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //const {title, lesson , video , image} = req.body
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.send({ msg: "the course is updated with sucess", updatedCourse });
  } catch (error) {
    console.error(error);
  }
});

router.post("/registerStudent", async (req, res) => {
  try {
    const { studentName, studentEmail, studentPassword } = req.body;
    const existingStudent = await Student.findOne({ studentEmail: studentEmail });
    if (existingStudent) {
      res.send({ msg: "there is a student created with this E-mail" });
    } else {
      const newStudent = new Student({
        studentName: studentName,
        studentEmail: studentEmail,
        studentPassword: studentPassword,
      });
      const saltRounds = 10;
      const bcryptedPassword = await bcrypt.hash(studentPassword, saltRounds);
      newStudent.studentPassword = bcryptedPassword;
      await newStudent.save();
      res.send({ msg: "student created", newStudent });
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send({ msg: "student to delete is not found" });
    }
    res.send({ msg: "student deleted", deletedStudent });
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateStudent/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { studentName, studentPassword } = req.body;
    const theStudentToUpdate = await Student.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (theStudentToUpdate) {
      const saltRounds = 10;
      const cryptedPassword = await bcrypt.hash(studentPassword, saltRounds);
      theStudentToUpdate.studentPassword = cryptedPassword;
      await theStudentToUpdate.save();

      const identification = {
        id: theStudentToUpdate._id,
      };
      const token = await JWT.sign(identification, "kkjdchlsdcb", 
        {expiresIn: "24h"}
    );
      res.send({ msg: "the student is updated", theStudentToUpdate, token });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
