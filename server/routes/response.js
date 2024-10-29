const express = require("express");
const router = express.Router();
const Response = require("../models/responseSchema");

router.post("/registerResponseStudent", async (req, res) => {
  try {
    const { studentId, studentName, checkPointQuestions, studentResponses } =
      req.body;
    const existingResponse = await Response.findOne({ studentId: studentId });
    if (existingResponse) {
      return res
        .status(400)
        .send({ msg: "you have already submitted this test" });
    }
    const newResponse = new Response({
      studentId: studentId,
      studentName: studentName,
      checkPointQuestions: checkPointQuestions.map((oneCheckPoint) => ({
        checkPointId: oneCheckPoint.checkPointId,
        question: oneCheckPoint.question,
        options: oneCheckPoint.options,
        correctAnswer: oneCheckPoint.correctAnswer,
      })),
      studentResponses: studentResponses,
    });
    await newResponse.save();
    res.send({ msg: "Response submitted successfully", newResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error whene submitting response", error });
  }
});

router.get("/showResponse", async (req, res) => {
  try {
    const responses = await Response.find();
    res.send({ msg: "these are the students responses", responses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error in downloading student scores", error });
  }
});

router.get("/showStudentResponse/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const studentResponse = await Response.findOne({ studentName: userName });
    if (!studentResponse) {
      return res
        .status(404)
        .send({ msg: "Responses not found for this student" });
    }
    res.send({
      msg: "Student responses retrieved successfully",
      studentResponse,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        msg: "An error occurred while retrieving student responses",
        error,
      });
  }
});

router.delete("/deletingResponses/:id"), async(req,res) => {
  try {
    const {id} = req.params;
    console.log("Deleting response with id:", id)
    const deletedResponse = await Response.findByIdAndDelete(id);
console.log("gfhfgffg")
    if (!deletedResponse) {
      return res.status(404).send({ msg: "Response to delete is not found" });
    }
    res.send({ msg: "Response deleted succsessfully", deletedResponse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while deleting the response", error });
  }
};
module.exports = router;
