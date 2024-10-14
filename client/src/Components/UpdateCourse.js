import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateCourse } from "../Redux/action";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    maxHeight: "90vh",
    backgroundColor: "#eaecf0"
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
  const [uploading, setUploading] = useState(false);

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

  const uploadImageCourse = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/course/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setNewImage(res.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

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
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                rows="4"
                cols="70"
                as="textarea"
                placeholder="lesson"
                style={{ height: "100px" }}
                value={NewLesson1}
                onChange={(e) => setNewLesson1(e.target.value)}
              />
            </FloatingLabel>
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
            {image ? (
              <img
                src={image}
                width="100%"
                style={{ margin: "8px 0" }}
                height="150px"
                alt="course"
              />
            ) : (
              <label style={{ fontWeight: "bold" }}>
                {!uploading ? "Upload Image For course" : "Loading ..."}
              </label>
            )}
            <div className="=" mb-3>
              <input
                accept="image/*"
                type="file"
                onChange={uploadImageCourse}
                style={{ display: "block", marginTop: "8px" }}
              />
            </div>
            <hr></hr>
            <label style={{ fontWeight: "bold" }}>
              updating lesson : part two{" "}
            </label>{" "}
            <br></br>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                rows="4"
                cols="70"
                as="textarea"
                placeholder="lesson"
                style={{ height: "100px" }}
                value={NewLesson2}
                onChange={(e) => setNewLesson2(e.target.value)}
              />
            </FloatingLabel>
            <hr></hr>
            <Button variant="outline-success" onClick={editCourse}>
              Edit course{" "}
            </Button>
          </form>
          <Button variant="outline-danger" onClick={closeModal}>
            close
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default UpdateCourse;
