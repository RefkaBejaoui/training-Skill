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
  const [shake, setShake] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddNewUser = (e) => {
    e.preventDefault();
    if (!userName || !userPassword || !userEmail || !userRole) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const NewUser = {
      userName: userName,
      userPassword: userPassword,
      userEmail: userEmail,
      role: userRole,
    };
    dispatch(registerUser(NewUser));
    navigate("/adminDashBoard/studentList");
  };

  return (
    <>
      <Form style={{  marginLeft: 100, width: 550 , backgroundColor:'rgb(70, 71, 72)' , paddingTop:10 }}>
      <h2 style={{color:"white"}}>Adding student</h2>
      <hr></hr>
      <Form.Label style={{fontSize:20 ,marginRight:450 , fontWeight: "bold" , color: "#a3cae9"}}>Role</Form.Label>
        <Form.Select
        style={{fontSize:15 ,marginRight:400 , color: "black"}}
          aria-label="Default select example"
          onChange={(e) => setUserRole(e.target.value)}
          required
        >
          <option>what is the role ? </option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </Form.Select>
        <Form.Label style={{fontSize:20 ,marginRight:400 , fontWeight: "bold" , color: "#a3cae9"}}> User name </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Form.Label style={{fontSize:20 ,marginRight:400 , fontWeight: "bold" , color: "#a3cae9"}}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <Form.Label style={{fontSize:20 ,marginRight:450 , fontWeight: "bold" , color: "#a3cae9"}}>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          onClick={AddNewUser}
          className={shake ? "shake" : ""}
          style={{marginBottom:10}}
        >
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddUser;
