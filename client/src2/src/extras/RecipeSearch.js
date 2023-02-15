import React, { useState, useEffect } from "react";
// import { testRecipes } from "../extras/testRecipes";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const RecipeSearch = ({ handleClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("chicken");

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=a3a46b695fab4d10b5a00438d9047b51&query=${search}`
    )
      .then((response) => response.json())
    setRecipes(response.results);
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {recipes.map((recipe, index) => (
            <Col key={index} className="text-center" md={4}>
              <Row>
                <h4>{recipe.title}</h4>
              </Row>
              <Row>
                <img
                  className="testRecipePic"
                  src={recipe.image}
                  alt={recipe.title}
                  onClick={() => handleClick(recipe.id)}
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
