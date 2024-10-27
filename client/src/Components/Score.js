import Table from "react-bootstrap/Table";
import { showScores, showStudentScore } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


function Score() {
  const theStudentScore = useSelector((state) => state.score) || {};
  const theCurrentUser = useSelector((state) => state.user);
  const theCheckPoint = useSelector((state) => state.checkPoint);
  
  const student = theCurrentUser.role;
  const length = theCheckPoint.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (student === "student") {
      dispatch(showStudentScore(theCurrentUser.userName));
    } else {
      dispatch(showScores());
    }
  }, [dispatch, student, theCurrentUser.userName]);

const showStudentCheckPoint = () => {
navigate("/adminDashBoard/checkPointList/correction")
}


  return (
    <>
      <h2
        style={{
          textDecoration: "underline",
          fontWeight: 900,
          color: "Window",
        }}
      >
        Final score
      </h2>

      <Table striped bordered hover variant="dark" style={{ width: "97%" }}>
        <thead>
          <tr>
            {student === "student" ? (
              <>
                <th>Student name</th>
                <th>Score</th>
                <th>Total checkPoints</th>
                <th>Correction</th>
              </>
            ) : (
              <>
                <th>#</th>
                <th>Student name</th>
                <th>Score</th>
                <th>Total checkPoints</th>
                <th>Response</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {student === "student" ? (
            <tr>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {theCurrentUser.userName}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {theStudentScore.studentScore}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {length}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {}
              </td>
            </tr>
          ) : (
            Array.isArray(theStudentScore) &&
            theStudentScore.map((score, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {score.studentName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {score.studentScore}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {length}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button variant="outline-info" onClick={showStudentCheckPoint}>Show response</Button>
                </td>
               
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Score;
