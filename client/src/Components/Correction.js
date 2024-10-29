import { useDispatch, useSelector } from "react-redux";
import { deleteStudentResponse,deleteStudentScore, showStudentResponse } from "../Redux/action";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Correction({ selectedStudent }) {
  const theResponse = useSelector((state) => state.response);
  console.log(theResponse)
  const theCurrentUser = useSelector((state) => state.user);
  const theCheckPoint = useSelector((state) => state.checkPoint);
  const theCheckPointCorrectAnswer = theCheckPoint.map(
    (checkpoint) => checkpoint.correction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const studentName = selectedStudent || theCurrentUser.userName;
    dispatch(showStudentResponse(studentName));
  }, [dispatch, selectedStudent, theCurrentUser.userName]);

  const theID = theResponse.studentId
  console.log(theID)
const clearResponseAndScore = (theID) => {
  if (theCurrentUser.role === "admin") {
    const confirmed = window.confirm(
      "Are you sure you want to delete the student score and response?"
    );
    if (confirmed) {
      dispatch(deleteStudentResponse(theID));
      dispatch(deleteStudentScore(theID))
    }
  }

}

  return (
    <>
      <h5 style={{ color: "white", padding: 20 }}>
        The chechPoint of {theResponse.studentName}
      </h5>
      <Table striped bordered hover variant="dark" style={{ width: "97%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Student responses</th>
            <th>Right answer</th>
            <th>Correction</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCheckPoint) &&
            theCheckPoint.map((el, index) => {
              const studentResponse = theResponse.studentResponses && theResponse.studentResponses[index] ? theResponse.studentResponses[index] : [];
              
              return (
                <tr key={el._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {el.question}
                  </td>
                  <td>
                    <Form>
                      {el.options.map((option, index) => {
                        const isStudentResponse =
                          studentResponse.includes(option);
                        return (
                          <div key={index} className="mb-3">
                            <Form.Check
                              type="checkbox"
                              id={`default-checkbox-${index}`}
                              label={option}
                              checked={isStudentResponse}
                              readOnly
                            />
                          </div>
                        );
                      })}
                    </Form>
                  </td>
                  <td>
                    <Form>
                      {el.options.map((option, index) => {
                        const correctAnswer = el.correctAnswer.includes(option);
                        return (
                          <div key={index} className="mb-3">
                            <Form.Check
                              type="checkbox"
                              id={`default-checkbox-${index}`}
                              label={option}
                              checked={correctAnswer}
                              readOnly
                            />
                          </div>
                        );
                      })}
                    </Form>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {theCheckPointCorrectAnswer.join(", ")}
                    {theCurrentUser.role === "admin" && (
        <Button variant="danger" onClick={() => clearResponseAndScore(theID)}>
          delete all
        </Button>
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

export default Correction;
