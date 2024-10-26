const express = require("express");
const router = express.Router();
const CheckPoint = require("../models/checkPointSchema");

router.post("/addCheckPoint", async (req, res) => {
  try {
    const { question, options, correctAnswer, correction} = req.body;
    const newCheckPoint = new CheckPoint({
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      correction: correction,
    });
    await newCheckPoint.save();
    res.send({ msg: "checkPoint added successfully", newCheckPoint });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error adding CheckPoint", error });
  }
});

router.get("/getCheckPoint", async (req, res) => { 
  try {
    const checkPoint = await CheckPoint.find();
    res.send({ msg: "this are all the checkPoints", checkPoint });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error in downloading the checkPoint", error });
  }
});

router.delete("/deleteCheckPoint/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCheckPoint = await CheckPoint.findByIdAndDelete(id);

    if (!deletedCheckPoint) {
      return res.status(404).send({ msg: "chechPoint to delete is not found" });
    }
    res.send({ msg: "checkPoint deleted succsessfully", deletedCheckPoint });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while deleting the checkPoint", error });
  }
});

router.put("/updateCheckPoint/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCheckPoint = await CheckPoint.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.send({
      msg: "the checkPoint is updated with sucess",
      updatedCheckPoint,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: "An error occurred while updating the CheckPoint", error });
  }
});
module.exports = router;