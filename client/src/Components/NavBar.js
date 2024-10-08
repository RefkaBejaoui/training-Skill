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
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(showUserName());
    // if (theCurrentUser) {
    //   //setIsLoggedIn(true);
    // }
  }, [dispatch]);

  const logForm = () => {
    setShowLogin(true);
    //setIsLoggedIn(true);
  };

  const isLoggedOut = () => {
    //setIsLoggedIn(false);
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

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Health Care Training</Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="dark" onClick={goToHomePage}>
              HomePage
            </Button>

            {theCurrentUser ? (
              <>
                <Button variant="dark" onClick={goTODashBoard}>
                  Dashboard
                </Button>
                <Button variant="dark" onClick={isLoggedOut}>
                  logout
                </Button>
              </>
            ) : (
              !theCurrentUser && (
                <Button variant="dark" onClick={logForm}>
                  Login
                </Button>
              )
            )}
          </Nav>
        </Container>
        <h6 style={{ color: "white" }}>
          {theCurrentUser && theCurrentUser.userName}
        </h6>
      </Navbar>
      {showLogin && <Login />}
    </>
  );
}

export default NavBar;
