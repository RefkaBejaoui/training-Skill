const express = require("express");
const router = express.Router();
const Course = require("../models/courseSchema");
const multer = require("multer")
const fs = require('fs')
const path = require('path')

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


router.get("/getAllCourses" , async (req , res) => {
    try {
        const courses = await Course.find() ;
        res.send ({msg:"this are all th courses" , courses})
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "An error in downloading the courses", error });
    }
})


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
//////////////////////////////////////////
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
    const finalCorse = await Course.findByIdAndUpdate(
      id,
      {...req.body },
      { new: true }
    );
    res.send({ msg: "the course is updated with sucess", finalCorse });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
