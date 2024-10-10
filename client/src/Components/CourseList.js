import Table from "react-bootstrap/Table";
import UpdateCourse from "./UpdateCourse";
import Button from "react-bootstrap/Button";
import { deleteCourse, getCourses } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const theCourse = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleted = (id) => {
    dispatch(deleteCourse(id));
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
 

  const ajouter = () => {
    navigate("/adminDashBoard/courseList/addCourse");
  };

  return (
    <>
      <h1>course list</h1>
      <Button variant="outline-dark" onClick={ajouter}>
        Add course
      </Button> 
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Delete course</th>
            <th>Edit course</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCourse) &&
            theCourse.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.title}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleted(el._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <UpdateCourse
                      id={el._id}
                      title={el.title}
                      lesson={el.lesson}
                      video={el.video}
                      image={el.image}
                    />
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
