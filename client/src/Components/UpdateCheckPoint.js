
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateCheckpoint } from "../Redux/action";
//import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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
    backgroundColor: "#eaecf0"
  },
};

Modal.setAppElement("#root");

function UpdateCheckPoint({ id, question, options, correctAnswer }) {
  let subtitle;
  const [NewQuestion, setNewQuestion] = useState(question);
  const [NewOptions, setNewOptions] = useState([]);
  const [NewCorrectAnswer, setNewCorrectAnswer] = useState(correctAnswer);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentOption, setCurrentOption] = useState("");

  useEffect(()=>{
    setNewOptions(options)
  },[])
  

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
      correctAnswer: NewCorrectAnswer,
    };
    dispatch(updateCheckpoint(id, updatedCheckPoint));
    setNewOptions([options])
    window.location.reload();
    closeModal();
  };

  const handleAddOption = () => {
    if (currentOption) {
      setNewOptions((prevOptions) => [...prevOptions, currentOption]);
      setCurrentOption("");
    }
    console.log(options)
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
              size="50"
              placeholder="question"
              type="text"
              value={NewQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>
             Update options
            </label>
            <br></br>
            
            <input
          type="text"
          placeholder="options"
          style={{backgroundColor:"rgb(201, 215, 222)" }}
         value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        />
              
              <Button type="button" onClick={handleAddOption} variant="secondary" style={{ marginTop: 10 }}>
                Add Answer
              </Button>
              
           
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>update currect answer </label> <br></br>
            <input
              size="50"
              placeholder="video"
              type="text"
              value={correctAnswer}
              onChange={(e) => setNewCorrectAnswer(e.target.value)}
            />
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
