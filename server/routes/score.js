const express = require("express")
const router = express.Router();
const Score = require("../models/scoreSchema");


router.post("/registerScore" , async(req,res) => {
    try {
        const {studentScore , studentId , studentName} = req.body;
        const newScore = new Score({
            studentScore: studentScore,
           studentId: studentId,
           studentName : studentName,
        });
        await newScore.save();
        res.send({msg:"Student score registered succseefully" , newScore})
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: "An error occurred while registering the score", error })
    }
})

router.get("/showScores" , async(req , res) => {
    try {
        const scores = await Score.find();
        res.send({msg:"these are the students scores" , scores})
    } catch (error) {
        console.error(error)
        res.status(500).send({msg:"An error in downloading student scores" , error})
    }
})

router.get("/showStudentScore/:userName", async (req, res) => {
    try {
      const { userName } = req.params;
      const studentScore = await Score.findOne({ studentName : userName })
      if (!studentScore) {
        return res.status(404).send({ msg: "Score not found for this student" });
      }
      res.send({ msg: "Student score retrieved successfully", studentScore });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "An error occurred while retrieving student score", error });
    }
})  


module.exports = router;
