import React from "react";
import filters from "../extras/Filters";
import {Dropdown, Col, Row, Container, Form, FormControl, Button} from 'react-bootstrap';
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <Container>
      <Row>
        <Form inline>
          <Row>
            <Col>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col>
              <Button variant="outline-primary">Search</Button>
            </Col>
          </Row>
        </Form>
      </Row>

      <Row>
        <Col className="d-flex d-inline-block">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Cuisine
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filters.cuisines.map((cuisine) => {
                return (
                  <Dropdown.Item href="#/action-1">{cuisine}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex d-inline-block">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Diet
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {filters.diets.map((diet) => {
                return <Dropdown.Item href="#/action-1">{diet}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex d-inline-block">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Intolorances
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filters.intolorances.map((intolorance) => {
                return (
                  <Dropdown.Item href="#/action-1">{intolorance}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex d-inline-block">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filters.types.map((type) => {
                return <Dropdown.Item href="#/action-1">{type}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
