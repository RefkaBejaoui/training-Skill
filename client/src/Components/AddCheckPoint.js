
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCheckPoint } from "../Redux/action";
import { useState } from "react";


function AddCheckPoint() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [required, setRequired] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentOption, setCurrentOption] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddNewCheckPoint = (e) => {
    e.preventDefault();
    const newCheckPoint = {
        question: question,
        options: options,
        required: required,
        correctAnswer: correctAnswer,
    };
    dispatch(addCheckPoint(newCheckPoint));
    setOptions([])
    navigate("/adminDashBoard/CheckPointList");
   
  };

  const handleAddOption = () => {
    if (currentOption) {
      setOptions((prevOptions) => [...prevOptions, currentOption]);
      setCurrentOption("");
    }
    console.log(options)
  };
  return (
    <>
      <Form style={{ marginLeft: 100, width: 550 , backgroundColor:'rgb(70, 71, 72)' , paddingTop:20 }}>
      <h2 style={{color:"white"}}>Adding CheckPoint</h2>
        <Form.Label style={{fontSize:20 ,marginRight:400 , fontWeight: "bold" , color: "#a3cae9"}}> Qestion </Form.Label>
        <Form.Control
          type="text"
          placeholder="question"
          style={{backgroundColor:"rgb(201, 215, 222)" }}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <hr></hr>
        <Form.Label style={{fontSize:20 ,marginRight:400 , fontWeight: "bold" , color: "#a3cae9"}}> option </Form.Label>
        <Form.Control
          type="text"
          placeholder="options"
          style={{backgroundColor:"rgb(201, 215, 222)" }}
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        />
         <Button type="button" onClick={handleAddOption} variant="secondary" style={{ marginTop: 10 }}>
          Add option
        </Button>
           
            <hr></hr>
        <Form.Label style={{ fontSize:20 ,marginRight:400 ,fontWeight: "bold", color: "#a3cae9" }}>required</Form.Label>
        <Form.Control
        style={{backgroundColor:"rgb(201, 215, 222)" }}
          type="text"
          placeholder="required"
          onChange={(e) => setRequired(e.target.value)}
        />
 <hr></hr>

 <Form.Label style={{ fontSize:20 ,marginRight:400 ,fontWeight: "bold", color: "#a3cae9" }}>correctAnswer</Form.Label>
        <Form.Control
        style={{backgroundColor:"rgb(201, 215, 222)" }}
          type="text"
          value={correctAnswer}
          placeholder="correctanswer"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        
        <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          onClick={AddNewCheckPoint}
          style={{marginBottom:10}}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
export default AddCheckPoint;
