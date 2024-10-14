import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/action";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
//import Alert from "react-bootstrap/Alert"

function Login() {
  const theCurrentUser  = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newUser = (e) => {
    e.preventDefault();
    const user = {
      userName: userName,
      userPassword: userPassword,
    };
dispatch(loginUser(user));

};

  useEffect(() => {
    if (theCurrentUser) {
      if (theCurrentUser.role === "student") {
        navigate("/studentDashBoard");
        window.location.reload();
      } else if (theCurrentUser.role === "admin") {
        navigate("/adminDashBoard");
        window.location.reload();
      }
    }
  }, [theCurrentUser, navigate]);

  return (
    <>
      <Form style={{ marginTop: 50 ,marginBottom:100, padding:70 ,marginLeft:200, marginRight:200 }}>

        {/* {error && <Alert variant="danger">{error}</Alert>} */}

        <Form.Label style={{ fontWeight: "bold" , color: "#a3cae9"}}> User name </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Form.Label style={{ fontWeight: "bold" , color: "#a3cae9" }}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br></br>
        <Button variant="primary" type="submit" onClick={newUser}>
          login
        </Button>
      </Form>
    </>
  );
}

export default Login;
