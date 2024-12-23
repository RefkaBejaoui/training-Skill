const express = require("express");
const router = express.Router();
const Course = require("../models/courseSchema");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`/uploads/${req.file.filename}`);
});

router.get("/images/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("course not found");
    }

    if (!course.image) {
      return res.status(404).send("course does not have an image");
    }

    const normalizedPath = path.normalize(course.image);
    const filePath = path.join(__dirname, "..", normalizedPath);

    console.log("course Image Path:", course.image);
    console.log("Normalized Path:", normalizedPath);
    console.log("Full File Path:", filePath);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/test-image", (req, res) => {
  const testFilePath = path.join(
    __dirname,
    "..",
    "uploads",
    "1691140790778.jpg"
  );
  res.sendFile(testFilePath);
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


router.post("/addCourse", async (req, res) => {
  try {
    const { title, lesson1, video, image, lesson2 } = req.body;
    const newCourse = new Course({
      title: title,
      lesson1: lesson1,
      video: video,
      image: image,
      lesson2: lesson2,
    });
    await newCourse.save();
    res.send({ msg: "course added successfully", newCourse });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/deleteCourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).send({ msg: "course to delete is not found" });
    }
    res.send({ msg: "course deleted succsessfully", deletedCourse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while deleting the course", error });
  }
});

router.put("/updateCourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.send({ msg: "the course is updated with sucess", updatedCourse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while updating the course", error });
  }
});

module.exports = router;
