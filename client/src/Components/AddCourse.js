import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCourse } from "../Redux/action";
import { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [lesson1, setLesson1] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [lesson2, setLesson2] = useState("");
  const [shake, setShake] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setImage(res.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const AddNewCourse = (e) => {
    e.preventDefault();
    if (!title) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const NewCourse = {
      title: title,
      lesson1: lesson1,
      video: video,
      image: image,
      lesson2: lesson2,
    };
    dispatch(addCourse(NewCourse));
    navigate("/adminDashBoard/courseList");
  };

  const handleChange = (e) => {
    setLesson1(e.target.value);
  };
  return (
    <>
      <Form style={{ marginLeft: 100, width: 400 }}>
        <Form.Label style={{ fontWeight: "bold" }}> Title </Form.Label>
        <Form.Control
          type="text"
          placeholder="Title of the course"
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr></hr>
        <Form.Label style={{ fontWeight: "bold" }}>Part one lesson </Form.Label>
        <textarea
          rows="4"
          cols="50"
          type="text"
          placeholder="lesson of the course"
          value={lesson1}
          onChange={handleChange}
        >
          <div></div>
        </textarea>
        <Form.Label style={{ fontWeight: "bold" }}>video</Form.Label>
        <Form.Control
          type="text"
          placeholder="video"
          onChange={(e) => setVideo(e.target.value)}
        />

        {image ? (
          <img
            src={image}
            width="100%"
            style={{ margin: "8px 0" }}
            height="150px"
            alt="course"
          />
        ) : (
          <Form.Label style={{ fontWeight: "bold" }}>
            {!uploading ? "Upload Image For course" : "Loading ..."}
          </Form.Label>
        )}
        <div className="=" mb-3>
          <input
            accept="image/*"
            type="file"
            onChange={uploadImageCourse}
            style={{ display: "block", marginTop: "8px" }}
          />
        </div>
        <Form.Label style={{ fontWeight: "bold" }}>Part two lesson </Form.Label>
        <textarea
          rows="4"
          cols="50"
          type="text"
          placeholder="lesson of the course"
          onChange={(e) => setLesson2(e.target.value)}
        ></textarea>
        <Button
          variant="outline-dark"
          type="submit"
          onClick={AddNewCourse}
          className={shake ? "shake" : ""}
        >
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddCourse;
