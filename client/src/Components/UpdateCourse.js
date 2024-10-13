import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../Redux/action";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    maxHeight: "90vh",
  },
};

Modal.setAppElement("#root");

function UpdateCourse({ id, title, lesson1, video, image, lesson2 }) {
  let subtitle;
  const [NewTitle, setNewTitle] = useState(title);
  const [NewLesson1, setNewLesson1] = useState(lesson1);
  const [NewVideo, setNewVideo] = useState(video);
  const [NewImage, setNewImage] = useState(image);
  const [NewLesson2, setNewLesson2] = useState(lesson2);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const theCourse = useSelector((state) => state.course);
  console.log(theCourse);

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

  const editCourse = (e) => {
    e.preventDefault();
    const updatedCourse = {
      id,
      title: NewTitle,
      lesson1: NewLesson1,
      video: NewVideo,
      image: NewImage,
      lesson2: NewLesson2,
    };
    dispatch(updateCourse(id, updatedCourse));
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
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit course</h2>

          <form>
            <label style={{ fontWeight: "bold" }}>New title </label>
            <br></br>
            <input
              size="45"
              placeholder="title"
              type="text"
              value={NewTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />{" "}
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>
              updating lesson : part one{" "}
            </label>{" "}
            <br></br>
            <textarea
              rows="4"
              cols="70"
              placeholder="lesson"
              type="text"
              value={NewLesson1}
              onChange={(e) => setNewLesson1(e.target.value)}
            ></textarea>
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>New video </label> <br></br>
            <input
              size="45"
              placeholder="video"
              type="text"
              value={NewVideo}
              onChange={(e) => setNewVideo(e.target.value)}
            />
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>new image</label> <br></br>
            <input
              size="45"
              placeholder="image"
              type="text"
              value={NewImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>
              updating lesson : part two{" "}
            </label>{" "}
            <br></br>
            <textarea
              rows="4"
              cols="70"
              placeholder="lesson"
              type="text"
              value={NewLesson2}
              onChange={(e) => setNewLesson2(e.target.value)}
            ></textarea>
            <hr></hr>
            <Button variant="outline-success" onClick={editCourse}>
              Edit course{" "}
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

export default UpdateCourse;
