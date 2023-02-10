import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../extras/SearchBar";
import RecipeSearch from "../extras/RecipeSearch";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <SearchBar />
      <Row>

        <RecipeSearch />

      </Row>
    </Container>
  );
};

export default Home;
