import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Col, Row } from "react-bootstrap";

import "./footer.css";

const Footer = () => {

  return (
    <>
      <Col className="footer-container">
        
        <p className="footerText">Made By</p>
        <Navbar className="justify-content-center footerText">
          <Nav>
            <Nav.Item>
              <Nav.Link target="_blank" href="https://github.com/michelletrn/">
                Michelle
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link target="_blank" href="https://github.com/peterlim995">
                Peter
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link target="_blank" href="https://github.com/inputName-jy">
                Justin
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link target="_blank" href="https://github.com/ThomasJay44">
                Thomas
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Col>
    </>
  );
};

export default Footer;

