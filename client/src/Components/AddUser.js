import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/action";
import { useState } from "react";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddNewUser = (e) => {
    e.preventDefault();
    const NewUser = {
      userName: userName,
      userPassword: userPassword,
      userEmail: userEmail,
      userRole: userRole,
    };
    dispatch(registerUser(NewUser));
    navigate("/adminDashBoard/studentList");
  };

  return (
    <>
      <h1>adding here</h1>

      <Form style={{ marginLeft: 100, width: 400 }}>
        <Form.Label style={{ fontWeight: "bold" }}> User name </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Form.Select aria-label="Default select example" onChange={(e) => setUserRole(e.target.value)}>
          <option>what is the role ? </option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </Form.Select>
        <Button variant="primary" type="submit" onClick={AddNewUser}>
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddUser;
