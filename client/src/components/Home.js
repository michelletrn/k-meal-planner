import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../extras/SearchBar";
import RecipeSearch from "../extras/RecipeSearch";
import Recipe from "../extras/Recipe";

const Home = () => {

  const handleClick = (recipeId) => {
    setCurrentComponent(<Recipe recipeId={recipeId} />);
  };

  const [currentComponent, setCurrentComponent] = useState(<RecipeSearch handleClick={handleClick} />);



  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <SearchBar />
      <Row>

      {currentComponent}



      </Row>
    </Container>
  );
};

export default Home;
