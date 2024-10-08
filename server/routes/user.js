const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const authorized = require("../middleware/authorized");
const Course = require("../models/courseSchema");

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

router.post("/registerUser", async (req, res) => {
  try {
    const { userName, userEmail, userPassword, role } = req.body;
    const existingUser = await User.findOne({ userEmail: userEmail });
    if (existingUser) {
      res.send({ msg: "there is a user created with this E-mail" });
    } else {
      const newUser = new User({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        role: role,
      });
      const saltRounds = 10;
      const bcryptedPassword = await bcrypt.hash(userPassword, saltRounds);
      newUser.userPassword = bcryptedPassword;
      await newUser.save();
      res.send({ msg: "user created", newUser });
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ msg: "user to delete is not found" });
    }
    res.send({ msg: "user deleted", deletedUser });
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { userName, userPassword } = req.body;
    const theUserToUpdate = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (theUserToUpdate) {
      const saltRounds = 10;
      const cryptedPassword = await bcrypt.hash(userPassword, saltRounds);
      theUserToUpdate.userPassword = cryptedPassword;
      await theUserToUpdate.save();

      const identification = {
        id: theUserToUpdate._id,
      };
      const token = await JWT.sign(identification, "kkjdchlsdcb", {
        expiresIn: "24h",
      });
      res.send({ msg: "the user is updated", theUserToUpdate, token });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      res.send({ msg: "you are not allowed" });
    } else {
      const allowed = await bcrypt.compare(userPassword, user.userPassword);
      if (!allowed) {
        res.send({ msg: "wrong password" });
      } else {
        const identification = {
          id: user._id,
        };
        const token = await JWT.sign(identification, "kkjdchlsdcb", {
          expiresIn: "24h",
        });
        res.send({ msg: "user is connected", user, token });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/authorized", authorized, (req, res) => {
  res.send({ user: req.user });
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
