import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Nav, Navbar, Col, Row} from 'react-bootstrap';

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <h4 class="footerText">Made By</h4>

      <Navbar className="justify-content-center">
        <Nav>
          <Nav.Item>
            <Nav.Link>Michelle</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Peter</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Justin</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Thomas</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default Footer;
