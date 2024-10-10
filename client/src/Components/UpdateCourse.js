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
  },
};

Modal.setAppElement("#root");

function UpdateCourse({ id, title, lesson, video, image }) {
  let subtitle;
  const [NewTitle, setNewTitle] = useState(title);
  const [NewLesson, setNewLesson] = useState(lesson);
  const [NewVideo, setNewVideo] = useState(video);
  const [NewImage, setNewImage] = useState(image);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const theCourse = useSelector((state)=>state.course);
  console.log(theCourse)
 
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
        lesson: NewLesson,
        video: NewVideo,
        image: NewImage,
      };
    dispatch(updateCourse( id,updatedCourse));
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
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit course</h2>

          <form>
            <label>New title </label>
            <input
              placeholder="title"
              type="text"
              value={NewTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            /> <br></br>
            <label>New lesson </label>
            <input
              placeholder="lesson"
              type="text"
              value={NewLesson}
              onChange={(e) => setNewLesson(e.target.value)}
            /><br></br>
            <label>New video </label>
            <input
              placeholder="video"
              type="text"
              value={NewVideo}
              onChange={(e) => setNewVideo(e.target.value)}
            /><br></br>
            <label>New image</label>
            <input
              placeholder="image"
              type="text"
              value={NewImage}
              onChange={(e) => setNewImage(e.target.value)}
            />

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
