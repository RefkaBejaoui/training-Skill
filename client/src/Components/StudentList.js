import Table from "react-bootstrap/Table";
import UpdateUser from "./UpdateUser";
import Button from "react-bootstrap/Button";
import { deleteUser, getStudents } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const theCurrentUser = useSelector((state) => state.student);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleted = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      dispatch(deleteUser(id));
      window.location.reload();
    }
  };
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const ajouter = () => {
    navigate("/adminDashBoard/studentList/addUser");
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
        Student list
      </h2>
      <Button
        style={{ marginLeft: "70%" }}
        variant="outline-info"
        onClick={ajouter}
      >
        Add student
      </Button>
      <hr style={{ height: "2px", backgroundColor: "white", border: "none" }} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theCurrentUser &&
            theCurrentUser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.userName}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <UpdateUser
                      id={el._id}
                      userName={el.userName}
                      userPassword={el.userPassword}
                    />
                    <Button
                      variant="outline-danger"
                      onClick={() => deleted(el._id)}
                    >
                      Delete
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

export default StudentList;
