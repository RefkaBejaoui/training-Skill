import Table from "react-bootstrap/Table";
import UpdateCourse from "./UpdateCourse";
import Button from "react-bootstrap/Button";
import { deleteCourse, getCourses } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CourseList() {
  const theCourse = useSelector((state) => state.course);
  const theCurrentUser = useSelector((state)=> state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
const admin = theCurrentUser.role
  const deleted = (id) => {
    if(admin === "admin") {
    dispatch(deleteCourse(id));
    window.location.reload();
  };}
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
 

  const ajouter = () => {
    if(admin === "admin") {
    navigate("/adminDashBoard/courseList/addCourse");
  }
  }
  return (
    <>
      <h1>course list</h1>
      {admin ==="admin" && (
      <Button variant="outline-dark" onClick={ajouter}>
        Add course
      </Button> 
      )}
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCourse) &&
            theCourse.map((el, index) => {
              return (
                
                <tr key ={el._id}>
                  {/* <Link to={`/studentDashBoard/courseList/${el._id}`} > */}
                  <td>{index + 1}</td>
                  <td>{el.title}</td>
                  <td>
                    {admin === "admin"&& (
                    <Button
                      variant="outline-danger"
                      onClick={() => deleted(el._id)}
                    >
                      Delete
                    </Button>
                    )}
                  </td>
                  <td>
                    {admin ==="admin" && (
                    <UpdateCourse
                      id={el._id}
                      title={el.title}
                      lesson={el.lesson}
                      video={el.video}
                      image={el.image}
                    />
                  )}
                  </td>
                  <td>
                  <Link to={`/studentDashBoard/courseList/${el._id}`} >
                    <button>View course</button>
                    </Link>
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
