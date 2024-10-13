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
      <h2 style={{ textDecoration: "underline", fontWeight: 900 }}>
        Course list
      </h2>
      {admin === "admin" && (
        <Button
          style={{ marginLeft: "70%" }}
          variant="outline-dark"
          onClick={ajouter}
        >
          Add course
        </Button>
      )}
      <hr />
      <Table striped bordered hover size="sm">
        <thead>
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
                    {admin === "admin" && (
                      <>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleted(el._id)}
                        >
                          Delete
                        </Button>
                        <UpdateCourse
                          id={el._id}
                          title={el.title}
                          lesson1={el.lesson1}
                          video={el.video}
                          image={el.image}
                          lesson2={el.lesson2}
                        />
                      </>
                    )}
                    {/* <Link
                      to={
                        admin === "admin"
                          ? `/adminDashBoard/courseList/${el._id}`
                          : `/studentDashBoard/courseList/${el._id}`
                      }
                    > */}
                    <Button
                      variant="outline-dark"
                      onClick={() => viewTheCourse(el._id)}
                    >
                      View course
                    </Button>
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
