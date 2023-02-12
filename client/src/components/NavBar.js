import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import './NavBar.css'



// const pages = ["Home", "Profile", "Extras", Logout];

const NavBar = ({ currentPage, setCurrentPage }) => {
  return (
    <>
      <header>
        <Row>
          <Col>
        <h1>Welcome To Our Recipe Machine</h1>
        </Col>
        </Row>
        <Row>
        <Navbar className="justify-content-center">
          {/* <Container> */}
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage("Home")}>
                Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage("Profile")}>
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage("Extras")}>
                Extras
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage("Login")}>
                Login
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage("Logout")}>
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {/* </Container> */}
        </Navbar>
        </Row>
      </header>
    </>
  );
};

export default NavBar;
