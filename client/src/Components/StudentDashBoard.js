import ListGroup from "react-bootstrap/ListGroup";
import { Link, Outlet } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function StudentDashBoard() {
  return (
    <>
      

      <container>
      <h1 style={{ textAlign: "start", marginLeft: 25, color: "darkblue", paddingBottom:10, paddingTop:60 }}>
        Student Dash-Board
      </h1>
        <Row style={{ paddingBottom:600}}>
          <Col md={2}>
            <ListGroup as="ol" numbered>
              <Link to="profile" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  action
                  variant="dark"
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Profile</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="courseList" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  action
                  variant="info"
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Courses</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="studentList" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  action
                  variant="dark"
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Score</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="CheckPointList" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  action
                  variant="info"
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">check Points</div>
                  </div>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>

          <Col md={10}>
            <Outlet />
          </Col>
        </Row>
      </container>
    </>
  );
}

export default StudentDashBoard;
