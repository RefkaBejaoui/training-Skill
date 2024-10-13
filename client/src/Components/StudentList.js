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
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
    dispatch(deleteUser(id));
    }
    //window.location.reload();
  };
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const ajouter = () => {
    navigate("/adminDashBoard/studentList/addUser");
  };

  return (
    <>
      <h2 style={{textDecoration: "underline", fontWeight:900}}>Student list</h2>
      <Button style={{marginLeft:"70%"}}variant="outline-dark" onClick={ajouter}>
        Add student
      </Button>
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
            {/* <th>Delete student</th>
            <th>Edit student</th> */}
          </tr>
        </thead>
        <tbody>
          {theCurrentUser &&
            theCurrentUser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.userName}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleted(el._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <UpdateUser
                      id={el._id}
                      userName={el.userName}
                      userPassword={el.userPassword}
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

export default StudentList;
