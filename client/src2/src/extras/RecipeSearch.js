import React, { useState, useEffect } from "react";
// import { testRecipes } from "../extras/testRecipes";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch`
    );
    setRecipes(response.data.results);
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {recipes.map((recipe, index) => (
            <Col key={index} class="text-center" md={4}>
              <Row>
                <h4>{recipe.title}</h4>
              </Row>
              <Row>
                <img
                  className="testRecipePic"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecipeSearch;
