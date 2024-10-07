import { useDispatch } from "react-redux";
import { loginStudent } from "../Redux/action";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [goToLesson, setGoToLesson] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newStudent = (e) => {
    e.preventDefault();
    const student = {
      studentName: studentName,
      studentPassword: password,
    };
    dispatch(loginStudent(student));
    navigate("/studentDashBoard");
    setGoToLesson(true);
  };

  return (
    <>
      {!goToLesson && (
        <Form style={{ margin: 180 }}>
          <Form.Label style={{ fontWeight: "bold" }}> User name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setStudentName(e.target.value)}
          />
          <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="primary" type="submit" onClick={newStudent}>
            login
          </Button>
        </Form>
      )}
    </>
  );
}

export default Login;
