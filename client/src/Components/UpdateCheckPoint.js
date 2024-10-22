import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateCheckpoint } from "../Redux/action";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    maxHeight: "90vh",
    backgroundColor: "#eaecf0",
  },
};

Modal.setAppElement("#root");

function UpdateCheckPoint({ id, question, options, correctAnswer }) {
  let subtitle;
  const [NewQuestion, setNewQuestion] = useState(question);
  const [NewOptions, setNewOptions] = useState([]);
  const [NewCorrectAnswers, setNewCorrectAnswers] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentOption, setCurrentOption] = useState("");
  const [oldOption, setOldOption] = useState("");
  const [updatedOption, setUpdatedOption] = useState("");
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");

  useEffect(() => {
    setNewOptions(options);
    setNewCorrectAnswers(correctAnswer);
  }, [options, correctAnswer]);

  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const editCheckPoint = (e) => {
    e.preventDefault();
    const updatedCheckPoint = {
      id,
      question: NewQuestion,
      options: NewOptions,
      correctAnswer: NewCorrectAnswers,
    };
    dispatch(updateCheckpoint(id, updatedCheckPoint));
    setNewOptions([options]);
    window.location.reload();
    closeModal();
  };

  const handleAddOption = () => {
    if (currentOption) {
      setNewOptions((prevOptions) => [...prevOptions, currentOption]);
      setCurrentOption("");
    }
    console.log(NewOptions);
  };

  const handleDeleteOption = (optionToDelete) => {
    setNewOptions((prevOptions) =>
      prevOptions.filter((option) => option !== optionToDelete)
    );
    setCurrentOption("");
  };

  const handleUpdateOption = (oldOption, updatedOption) => {
    setNewOptions((prevOption) =>
      prevOption.map((option) =>
        option === oldOption ? updatedOption : option
      )
    );
    setUpdatedOption("");
    setOldOption("");
  };

  const handleAddCorrectAnswer = () => {
    if (
      currentCorrectAnswer &&
      !NewCorrectAnswers.includes(currentCorrectAnswer)
    )
      setNewCorrectAnswers([...NewCorrectAnswers, currentCorrectAnswer]);
    setCurrentCorrectAnswer("");
  };

  const handleDeleteCorrectAnswer = (answerToDelete) => {
    setNewCorrectAnswers((answers) =>
      answers.filter((answer) => answer !== answerToDelete)
    );
    setCurrentCorrectAnswer("");
  };

  return (
    <>
      <div>
        <Button variant="outline-success" onClick={openModal}>
          Edit
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit checkPoint</h2>

          <form>
            <label style={{ fontWeight: "bold" }}>Update question </label>
            <br></br>
            <input
              size="70"
              placeholder="question"
              type="text"
              style={{ backgroundColor: "rgb(201, 215, 222)" }}
              value={NewQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>Update options</label>
            <br></br>
            <textarea
              style={{ backgroundColor: "rgb(201, 215, 222)" }}
              cols="75"
              rows="5"
              value={NewOptions.join("\n")}
            ></textarea>{" "}
            <br></br>
            <input
              type="text"
              size="25"
              style={{ backgroundColor: "rgb(201, 215, 222)", marginRight: 5 }}
              placeholder="Option to update"
              value={oldOption}
              onChange={(e) => setOldOption(e.target.value)}
            />
            <input
              size="25"
              type="text"
              style={{ backgroundColor: "rgb(201, 215, 222)", marginRight: 5 }}
              placeholder="New option value"
              value={updatedOption}
              onChange={(e) => setUpdatedOption(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => handleUpdateOption(oldOption, updatedOption)}
              variant="info"
            >
              Update option
            </Button>
            <br></br>
            <input
              size="43"
              type="text"
              placeholder="options"
              style={{ backgroundColor: "rgb(201, 215, 222)", marginRight: 5 }}
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
            />
            <Button type="button" onClick={handleAddOption} variant="success">
              Add option
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteOption(currentOption)}
              variant="danger"
            >
              Delete option
            </Button>
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>
              update currect answer{" "}
            </label>{" "}
            <br></br>
            <textarea
              style={{ backgroundColor: "rgb(201, 215, 222)" }}
              cols="75"
              rows="5"
              value={NewCorrectAnswers.join("\n")}
            ></textarea>{" "}
            <br></br>
            <input
              size="43"
              placeholder="Add correct answer"
              type="text"
              value={currentCorrectAnswer}
              onChange={(e) => setCurrentCorrectAnswer(e.target.value)}
              style={{ backgroundColor: "rgb(201, 215, 222)", marginRight: 5 }}
            />
            <Button onClick={handleAddCorrectAnswer} variant="success">
              {" "}
              Add answer{" "}
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteCorrectAnswer(currentCorrectAnswer)}
              variant="danger"
            >
              Delete answer
            </Button>
            <hr></hr>
            <Button variant="outline-success" onClick={editCheckPoint}>
              Edit course{" "}
            </Button>
          </form>
          <Button variant="outline-danger" onClick={closeModal}>
            close
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default UpdateCheckPoint;
