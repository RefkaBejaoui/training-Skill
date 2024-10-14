import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/action";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";


function Profile() {
  const theCurrentUser = useSelector((state) => state.user);
  const [newUserName, setNewUserName] = useState(theCurrentUser.userName );
  const [newUserPassword, setNewUserPassword] = useState(theCurrentUser.userPassword);
  const [currentPasswordInput , setCurrentPasswordInput] = useState("")
  const dispatch = useDispatch();

 useEffect(()=>{
   setNewUserName(theCurrentUser.userName);
    setNewUserPassword(theCurrentUser.userPassword);
}, [theCurrentUser])

const validateCurentPassword = ()=> {
  return currentPasswordInput===theCurrentUser.userPassword;
}

  const updatingUser = async(e) => {
    e.preventDefault();
    if(!validateCurentPassword()){
      alert("current password is incorrect !!")
      return;
    }
    const updatedUser = {
      id: theCurrentUser._id,
      userName: newUserName,
      userPassword: newUserPassword,
    };
    await dispatch(updateUser(theCurrentUser._id, updatedUser));
    window.location.reload();
  };

  return (
    <>
      <h2
        style={{
          textDecoration: "underline",
          fontWeight: 900,
          color: "Window",
        }}
      >
        Update your profile
      </h2>
      <hr></hr>
      <Form
        style={{
          marginLeft: 100,
          width: 550,
          backgroundColor: "rgb(70, 71, 72)",
          paddingTop: 10,
        }}
       onSubmit={updatingUser}
      >
        <Form.Group controlId="formUserName">
          <Form.Label
            style={{
              fontSize: 20,
              marginRight: 400,
              fontWeight: "bold",
              color: "#a3cae9",
            }}
          >
            User name
            </Form.Label>
        

        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with checkbox"
            placeholder="name"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </InputGroup>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label
            style={{
              fontSize: 20,
              marginRight: 350,
              fontWeight: "bold",
              color: "#a3cae9",
            }}
          >
    Current password </Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with checkbox"
            type="text"
            placeholder="current password"
            value={currentPasswordInput}
            onChange={(e) => setCurrentPasswordInput(e.target.value)}
          />
        </InputGroup>
</Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label
            style={{
              fontSize: 20,
              marginRight: 350,
              fontWeight: "bold",
              color: "#a3cae9",
            }}
          >
    New password </Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with checkbox"
            type="text"
            placeholder="Password"
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
        </InputGroup>
</Form.Group>
        <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          //onClick={updatingUser}
          style={{ marginBottom: 10 }}
        >
          update
        </Button>
      </Form>
    </>
  );
}

export default Profile;

