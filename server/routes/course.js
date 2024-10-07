// const express = require("express");
// const router = express.Router();
// const Course = require("../models/courseSchema");

// router.get("/getAllCourses" , async (req , res) => {
//     try {
//         const courses = await Course.find() ;
//         res.send ({msg:"this are all th courses" , courses})
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ msg: "An error in downloading the courses", error });
//     }
// })


// router.post("/addCourse", async (req, res) => {
//     try {
//       const { title, lesson, video, image } = req.body;
//       const newCourse = new Course({
//         title: title,
//         lesson: lesson,
//         video: video,
//         image: image,
//       });
//       await newCourse.save();
//       res.send({ msg: "course added successfully", newCourse });
//     } catch (error) {
//       console.error(error);
//     }
//   });
////////////////////////////////////////////
// router.delete("/deletCourse/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedCouse = await Course.findByIdAndDelete(id);
//     res.send({ msg: "cource deleted ", deletedCouse });
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.put("/updateCourse/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     //const {title, lesson , video , image} = req.body
//     const finalCorse = await Course.findByIdAndUpdate(
//       id,
//       {...req.body },
//       { new: true }
//     );
//     res.send({ msg: "the course is updated with sucess", finalCorse });
//   } catch (error) {
//     console.error(error);
//   }
// });

// module.exports = router;
