import Table from "react-bootstrap/Table";
import UpdateCourse from "./UpdateCourse";
import Button from "react-bootstrap/Button";
import { deleteCourse, getCourses } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const theCourse = useSelector((state) => state.course);
  const theCurrentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = theCurrentUser.role;

  const deleted = (id) => {
    if (admin === "admin") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (confirmed) {
        dispatch(deleteCourse(id));
      }
    }
  };
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const ajouter = () => {
    if (admin === "admin") {
      navigate("/adminDashBoard/courseList/addCourse");
    }
  };

  const viewTheCourse = (courseId) => {
    navigate(`/courseDetails/${courseId}`);
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
        Course list
      </h2>
      {admin === "admin" && (
        <Button
          style={{ marginLeft: "70%" }}
          variant="outline-info"
          onClick={ajouter}
        >
          Add course
        </Button>
      )}
      <hr style={{ height: "2px", backgroundColor: "white", border: "none" }} />
      <Table striped bordered hover variant="dark"  >
        <thead >
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCourse) &&
            theCourse.map((el, index) => {
              return (
                <tr key={el._id}>
                  <td>{index + 1}</td>
                  <td>{el.title}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button
                      variant="outline-info"
                      onClick={() => viewTheCourse(el._id, index)}
                    >
                      View course
                    </Button>
                    {admin === "admin" && (
                      <>
                        <UpdateCourse
                          id={el._id}
                          title={el.title}
                          lesson1={el.lesson1}
                          video={el.video}
                          image={el.image}
                          lesson2={el.lesson2}
                        />
                        <Button
                          variant="outline-danger"
                          onClick={() => deleted(el._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default CourseList;
