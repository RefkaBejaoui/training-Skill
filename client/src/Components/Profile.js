import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../Redux/action";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Profile() {
  const theCurrentUser = useSelector((state) => state.user);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const dispatch = useDispatch();

  const updatingUser = async (e) => {
    e.preventDefault();
    if (!currentPasswordInput || !newUserPassword) {
      alert("please enter both the curent and the new passwords");
      return;
    }
    try {
      await dispatch(
        updatePassword(
          theCurrentUser._id,
          currentPasswordInput,
          newUserPassword
        )
      );
      alert("Password updated successfully");
      setCurrentPasswordInput("");
      setNewUserPassword("");
    } catch (error) {
      alert("incorrect current password");
    }
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
        Update your password
      </h2>
      <hr></hr>
      <Form
        style={{
          marginLeft: 100,
          width: 550,
          backgroundColor: "rgb(70, 71, 72)",
          paddingTop: 10,
        }}
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
            <Form.Control value={theCurrentUser.userName} readOnly />
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
            Current password{" "}
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="current password"
              onChange={(e) => setCurrentPasswordInput(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formNewPassword">
          <Form.Label
            style={{
              fontSize: 20,
              marginRight: 350,
              fontWeight: "bold",
              color: "#a3cae9",
            }}
          >
            New password{" "}
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="New password"
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          onClick={updatingUser}
          style={{ marginBottom: 10 }}
        >
          update
        </Button>
      </Form>
    </>
  );
}

export default Profile;
