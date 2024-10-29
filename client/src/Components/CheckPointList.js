import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheckPoint,
  deleteCheckPoint,
  registerScore,
  showStudentResponse,
  registerResponseStudent,
  showStudentScore,
} from "../Redux/action";
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
    setSelectedOptions((SelectedOptions) => {
      const newSelectedOptions = { ...SelectedOptions };
      if (newSelectedOptions[questionId]?.includes(option)) {
        newSelectedOptions[questionId] = newSelectedOptions[questionId].filter(
          (theOption) => theOption !== option
        );
      } else {
        newSelectedOptions[questionId] = [
          ...(newSelectedOptions[questionId] || []),
          option,
        ];
      }
      return newSelectedOptions;
    });
  };

  const submitResponse = async () => {
    const existingResponse = await dispatch(
      showStudentResponse(theCurrentUser.userName)
    );
    const existingScore = await dispatch(
      showStudentScore(theCurrentUser.userName)
    );

    if (existingResponse || existingScore) {
      alert("Sorry, you can't repass the test.");
      return;
    }

    const allCheckPoints = theCheckPoint.map((checkPoint) => ({
      checkPointId: checkPoint._id,
      question: checkPoint.question,
      options: checkPoint.options,
      correctAnswer: checkPoint.correctAnswer,
    }));

    const selectedOptionsForAll = theCheckPoint.map(
      (checkPoint) => selectedOptions[checkPoint._id] || []
    );
    if (selectedOptionsForAll.some((res) => res.length === 0)) {
      alert("You have to pass all the tests.");
      return;
    }

    await dispatch(
      registerResponseStudent(
        theCurrentUser._id,
        theCurrentUser.userName,
        allCheckPoints,
        selectedOptionsForAll
      )
    );

    await dispatch(registerScore(theCurrentUser._id, theCurrentUser.userName));
    alert("You have submitted this test.");
    navigate("/studentDashBoard/studentScore");
    window.scrollTo(0, 0);
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
      <Table striped bordered hover variant="dark" style={{ width: "97%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            {admin === "admin" && <th>Actions</th>}
            {admin === "student" && <th>Correction</th>}
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
                            checked={
                              selectedOptions[el._id]?.includes(option) || false
                            }
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
