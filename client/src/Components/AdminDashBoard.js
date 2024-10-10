import ListGroup from "react-bootstrap/ListGroup";
import { Link, Outlet } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AdminDashBoard() {
  return (
    <>
      <h1>Admin Dash-Board</h1>

      <container>
        <Row>
          <Col md={3}>
            <ListGroup as="ol" numbered>
              <Link to="" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Update Profile</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="adminList" style={{ textDecoration: "none" }}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Admin</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="studentList" style={{ textDecoration: "none" }}>
                {" "}
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Students</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="courseList" style={{ textDecoration: "none" }}>
                {" "}
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Courses</div>
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="CheckPointList" style={{ textDecoration: "none" }}>
                {" "}
                <ListGroup.Item
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

          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </container>
    </>
  );
}

export default AdminDashBoard;
