import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateUser } from "../Redux/action";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function UpdateUser({ id, userName, userPassword }) {
  let subtitle;
  const [NewUserName, setNewUserName] = useState(userName);
  const [NewUserPassword, setNewUserPassword] = useState(userPassword);
  const [modalIsOpen, setIsOpen] = React.useState(false);
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

  const editUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      id,
      userName: NewUserName,
      userPassword: NewUserPassword,
    };
    dispatch(updateUser(id, updatedUser));
    window.location.reload();
    closeModal();
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
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit user</h2>

          <form>
            <label>New user name </label>
            <input
              placeholder="name"
              type="text"
              value={NewUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <label>New user password </label>
            <input
              placeholder="password"
              type="text"
              value={NewUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />

            <Button variant="outline-success" onClick={editUser}>
              Edit user
            </Button>
          </form>
          <Button variant="outline-dark" onClick={closeModal}>
            close
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default UpdateUser;
