import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckPoint, deleteCheckPoint } from "../Redux/action";
import Form from "react-bootstrap/Form";
import UpdateCheckPoint from "./UpdateCheckPoint";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CheckPontList() {
  const theCheckPoint = useSelector((state) => state.checkPoint);

  const theCurrentUser = useSelector((state) => state.user);
  const admin = theCurrentUser.role;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const length = theCheckPoint.length;
  useEffect(() => {
    dispatch(getCheckPoint());
  }, [dispatch]);

  const deleted = (id) => {
    if (admin === "admin") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this checkPoint?"
      );
      if (confirmed) {
        dispatch(deleteCheckPoint(id));
      }
    }
  };
  const ajouter = () => {
    if (admin === "admin") {
      navigate("/adminDashBoard/checkPointList/addCheckpoint");
    }
  };

  const handleCheckboxChange = (questionId, option) => {
    setSelectedOptions((x) => ({
      ...x,
      [questionId]: option,
    }));
  };

  const submitResponse = () => {
    let newScore = 0;
    theCheckPoint.forEach((checkPoint) => {
      if (selectedOptions[checkPoint._id] === checkPoint.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    alert(`Your score is: ${newScore}/ ${length} `);
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
        CheckPoint list
      </h2>
      {admin === "admin" && (
        <Button
          style={{ marginLeft: "70%" }}
          variant="outline-info"
          onClick={ajouter}
        >
          Add checkPoint
        </Button>
      )}
      <hr style={{ height: "2px", backgroundColor: "white", border: "none" }} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCheckPoint) &&
            theCheckPoint.map((el, index) => {
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
                      {el.options.map((option, index) => (
                        <div key={index} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-${index}`}
                            label={option}
                            onChange={() =>
                              handleCheckboxChange(el._id, option)
                            }
                          />
                        </div>
                      ))}
                    </Form>
                  </td>
                  <td>
                    {admin === "admin" && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <UpdateCheckPoint
                            id={el._id}
                            question={el.question}
                            options={el.options}
                            correctAnswer={el.correctAnswer}
                          />
                          <Button
                            variant="outline-danger"
                            onClick={() => deleted(el._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {admin !== "admin" && (
        <Button variant="success" onClick={submitResponse}>
          Submit
        </Button>
      )}
    </>
  );
}

export default CheckPontList;
