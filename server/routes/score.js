const express = require("express");
const router = express.Router();
const Score = require("../models/scoreSchema");
const Response = require("../models/responseSchema");

router.post("/registerScore", async (req, res) => {
  try {
    const { studentId, studentName } = req.body;
    const existingScore = await Score.findOne({studentName: studentName})
    const studentResponse = await Response.findOne({ studentName: studentName });
    if (!studentResponse || existingScore) {
      return res.status(404).send({ msg: "Student responses not found" });}
    let studentScore = 0;
    studentResponse.checkPointQuestions.forEach((checkPointQuestion, index) => {
      const selectedResponses = studentResponse.studentResponses[index];
      const allCorrect = checkPointQuestion.correctAnswer.every((answer) =>
        selectedResponses.includes(answer));
      const tooManySelected =
        selectedResponses.length > checkPointQuestion.correctAnswer.length;
      if (allCorrect && !tooManySelected) {
        studentScore += 1;}
    });
    const newScore = new Score({
      studentScore: studentScore,
      studentId: studentId,
      studentName: studentName,
      studentResponsesId: studentResponse._id,
    });
    await newScore.save();
    res.send({ msg: "Student score registered successfully", newScore });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while registering the score", error });
  }
});

router.get("/showScores", async (req, res) => {
  try {
    const scores = await Score.find();
    res.send({ msg: "these are the students scores", scores });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error in downloading student scores", error });
  }
});

router.get("/showStudentScore/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const studentScore = await Score.findOne({ studentName: userName });
    if (!studentScore) {
      return res.status(404).send({ msg: "Score not found for this student" });
    }
    res.send({ msg: "Student score retrieved successfully", studentScore });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while retrieving student score", error });
  }
});

router.delete("/deletingScores/:id"), async (req, res) => {
  try {
    const {id} = req.params;
    const deletedScore = await Score.findByIdAndDelete(id);

    if (!deletedScore) {
      return res.status(404).send({ msg: "score to delete is not found" });
    }
    res.send({ msg: "score deleted succsessfully", deletedScore });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while deleting the score", error });
  }
};

module.exports = router;
