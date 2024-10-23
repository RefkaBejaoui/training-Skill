import Table from "react-bootstrap/Table";
import { showScores, showStudentScore } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Score() {
  const theStudentScore = useSelector((state) => state.score)|| {};
  const theCurrentUser = useSelector((state) => state.user);
  const theCheckPoint = useSelector((state) => state.checkPoint);
  const student = theCurrentUser.role;
  const length = theCheckPoint.length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (student === "student") {
      dispatch(showStudentScore(theCurrentUser.userName));
    } else {
      dispatch(showScores());
    }
  }, [dispatch, student, theCurrentUser.userName ]);
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
            <th>#</th>
            <th>Student name</th>
            <th>Score</th>
            <th>Total checkPoints</th>
          </tr>
        </thead>
        <tbody>
          {student === "student" ? (
            <tr>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              1
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {theCurrentUser.userName}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {theStudentScore.studentScore}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {length}
              </td>
            </tr>
          ) : (
            Array.isArray(theStudentScore) && theStudentScore.map((score, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>

                  {score.studentName }
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {score.studentScore}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {length}
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
