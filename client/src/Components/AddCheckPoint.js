import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCheckPoint } from "../Redux/action";
import { useState } from "react";

function AddCheckPoint() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddNewCheckPoint = (e) => {
    e.preventDefault();
    const newCheckPoint = {
      question: question,
      options: options,
      correctAnswer: correctAnswer,
    };
    dispatch(addCheckPoint(newCheckPoint));
    setOptions([]);
    navigate("/adminDashBoard/CheckPointList");
  };

  const handleAddOption = () => {
    if (currentOption) {
      setOptions((prevOptions) => [...prevOptions, currentOption]);
      setCurrentOption("");
    }
    console.log(options);
  };

  const handleAddCorrectAnswer = () => {
    if (currentCorrectAnswer) {
      setCorrectAnswer((prevAnswer) => [...prevAnswer, currentCorrectAnswer]);
      setCurrentCorrectAnswer("");
    }
    console.log(correctAnswer);
  };
  return (
    <>
      <Form
        style={{
          marginLeft: 100,
          width: 550,
          backgroundColor: "rgb(70, 71, 72)",
          paddingTop: 20,
        }}
      >
        <h2 style={{ color: "white" }}>Adding CheckPoint</h2>
        <Form.Label
          style={{
            fontSize: 20,
            marginRight: 400,
            fontWeight: "bold",
            color: "#a3cae9",
          }}
        >
          Qestion
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="question"
          style={{ backgroundColor: "rgb(201, 215, 222)" }}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <hr></hr>
        <Form.Label
          style={{
            fontSize: 20,
            marginRight: 400,
            fontWeight: "bold",
            color: "#a3cae9",
          }}
        >
          Option
        </Form.Label>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Control
            type="text"
            placeholder="options"
            style={{
              backgroundColor: "rgb(201, 215, 222)",
              width: 400,
            }}
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
            required={true}
          />
          <Button type="button" onClick={handleAddOption} variant="secondary">
            Add option
          </Button>
        </div>
        <textarea
          cols="70"
          rows="5"
          value={options.join("\n")}
          style={{
            borderRadius: "10px",
            backgroundColor: "rgb(201, 215, 222)",
            marginTop: 5,
          }}
        ></textarea>
        <hr></hr>

        <Form.Label
          style={{
            fontSize: 20,
            marginRight: 320,
            fontWeight: "bold",
            color: "#a3cae9",
          }}
        >
          Correct Answer
        </Form.Label>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Control
            style={{ backgroundColor: "rgb(201, 215, 222)", width: 400 }}
            type="text"
            value={currentCorrectAnswer}
            placeholder="correct answer"
            onChange={(e) => setCurrentCorrectAnswer(e.target.value)}
            required={true}
          />
          <Button
            type="button"
            onClick={handleAddCorrectAnswer}
            variant="secondary"
          >
            Add answer
          </Button>
        </div>
        <textarea
          cols="70"
          rows="5"
          value={correctAnswer.join("\n")}
          style={{
            borderRadius: "10px",
            backgroundColor: "rgb(201, 215, 222)",
            marginTop: 5,
          }}
        ></textarea>

        <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          onClick={AddNewCheckPoint}
          style={{ marginBottom: 10 }}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
export default AddCheckPoint;
