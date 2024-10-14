import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckPoint, deleteCheckPoint , addCheckPoint} from "../Redux/action";
import Form from "react-bootstrap/Form";
import UpdateCheckPoint from "./UpdateCheckPoint";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CheckPontList() {
  const theCheckPoint = useSelector((state) => state.checkPoint);
  console.log(theCheckPoint);
  const theCurrentUser = useSelector((state)=>state.user)
  const admin = theCurrentUser.role
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCheckPoint());
  }, [dispatch]);

    const deleted = (id) => {
      if (admin === "admin") {
        const confirmed = window.confirm(
          "Are you sure you want to delete this course?");
        if (confirmed) {
          dispatch(deleteCheckPoint(id));}}};
    const ajouter = () => {
      if (admin === "admin") {
        navigate("/adminDashBoard/checkPointList/addCheckpoint");}};

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
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCheckPoint) &&
            theCheckPoint.map((el, index) => {
              return (
                <tr key={el._id}>
                  <td>{index + 1}</td>
                  <td>{el.question}</td>
                  <td>
                    <Form>
                      {el.options.map((option, index) => (
                        <div key={index} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-${index}`}
                            label={option}
                          />
                        </div>
                      ))}
                    </Form>
                  </td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}>
                    {admin === "admin" && (
                        <>
                          <UpdateCheckPoint
                            id={el._id}
                            title={el.title}
                            lesson1={el.lesson1}
                            video={el.video}
                            image={el.image}
                            lesson2={el.lesson2}
                          />
                          <Button
                            variant="outline-danger"
                            onClick={() => deleted(el._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Button variant="success">Submit</Button>
    </>
  );
}

export default CheckPontList;
