import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
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
      <Form style={{ marginLeft: 100, width: 550 , backgroundColor:'rgb(70, 71, 72)' , paddingTop:20 }}>
      <h2 style={{color:"white"}}>Adding course</h2>
        <Form.Label style={{fontSize:20 ,marginRight:400 , fontWeight: "bold" , color: "#a3cae9"}}> Title </Form.Label>
        <Form.Control
          type="text"
          placeholder="Title of the course"
          style={{backgroundColor:"rgb(201, 215, 222)" }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr></hr>
        <Form.Label style={{fontSize:20 ,marginRight:300 , fontWeight: "bold" , color: "#a3cae9"}}>Part one lesson </Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                rows="4"
                cols="70"
                as="textarea"
                placeholder="lesson of the course"
                style={{ height: "100px" , backgroundColor:"rgb(201, 215, 222)" }}
                value={lesson1}
          onChange={handleChange}
              />
            </FloatingLabel>
            <hr></hr>
        <Form.Label style={{ fontSize:20 ,marginRight:400 ,fontWeight: "bold", color: "#a3cae9" }}>video</Form.Label>
        <Form.Control
        style={{backgroundColor:"rgb(201, 215, 222)" }}
          type="text"
          placeholder="video"
          onChange={(e) => setVideo(e.target.value)}
        />
 <hr></hr>
        {image ? (
          <img
            src={image}
            width="100%"
            style={{ margin: "8px 0" }}
            height="150px"
            alt="course"
          />
        ) : (
          <Form.Label style={{ fontSize:20 ,marginRight:200 ,fontWeight: "bold", color: "#a3cae9"}}>
            {!uploading ? "Upload Image For course" : "Loading ..."}
          </Form.Label>
        )}
        <div className="=" mb-3>
          <input
            accept="image/*"
            type="file"
            onChange={uploadImageCourse}
            style={{ display: "block", marginTop: "8px", paddingLeft:30  }}
          />
        </div>
        <hr></hr>
        <Form.Label style={{ fontSize:20 ,marginRight:300 ,fontWeight: "bold" , color: "#a3cae9" }}>Part two lesson </Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                rows="4"
                cols="70"
                as="textarea"
                placeholder="lesson of the course"
                style={{ height: "100px", backgroundColor:"rgb(201, 215, 222)" }}
                value={lesson2}
                onChange={(e) => setLesson2(e.target.value)}
              />
            </FloatingLabel>
            <hr></hr>
        <Button
          variant="outline-info"
          type="submit"
          onClick={AddNewCourse}
          className={shake ? "shake" : ""}
          style={{marginBottom:10}}
        >
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddCourse;
