import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, showUserName } from "../Redux/action";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theCurrentUser = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(false);
  // const [showCourseListButton, setShowCourseListButton] = useState(false);

  useEffect(() => {
    dispatch(showUserName());
  }, [dispatch]);

  const logForm = () => {
    setShowLogin(true);
  };

  const isLoggedOut = () => {
    setShowLogin(false);
    dispatch(logOutUser());
    navigate("/");
  };

  const goToHomePage = () => {
    setShowLogin(false);
    navigate("/");
  };

  const goTODashBoard = () => {
    if (theCurrentUser.role === "admin") {
      navigate("/adminDashBoard");
    } else {
      navigate("/studentDashBoard");
    }
  };

  const BackToCourseListe = () => {
    if (theCurrentUser.role === "admin") {
      navigate("/adminDashBoard/courseList/");
    } else {
      navigate("/studentDashBoard/courseList/");
    }
    // setShowCourseListButton(true);
  };

  const isCourseDetailsPage = window.location.pathname.includes('courseDetails');


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand style={{fontWeight:900}}>Health Care Training</Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="dark" onClick={goToHomePage}>
              HomePage
            </Button>

            {theCurrentUser &&
              (isCourseDetailsPage ? (
                <Button variant="dark" onClick={BackToCourseListe}>
                  
                  Course list
                </Button>
              ) : (
                <Button variant="dark" onClick={goTODashBoard}>
                  Dashboard
                </Button>
              ))}
          </Nav>
          <Nav className="ms-auto">
            {theCurrentUser ? (
              <>
                <span
                  style={{
                    color: "blue",
                    marginRight: 20,
                    fontSize: 18,
                    marginTop: 4,
                  }}
                >
                  {theCurrentUser.userName}
                </span>
                <Button variant="dark" onClick={isLoggedOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="dark" onClick={logForm}>
                Login
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
      {showLogin && <Login />}
    </>
  );
}

export default NavBar;
