import React, { useState, useEffect } from 'react';

import { searchRecipes } from '../../utils/API';
import { Link } from 'react-router-dom';
import './SearchResult.css'
import { Col, Row } from "react-bootstrap";
const SearchResult = ({category, area, ingredient, mealName}) => {

    const [recipeList, setRecipeList] = useState([]);
    const [result, setResult] = useState('random');

    useEffect(() => {
        const getRecipe = async (query) => {
            try {
                const response = await searchRecipes(query);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const { meals } = await response.json();
                console.log(meals);
                
                if(meals !== null)
                    setRecipeList(meals);
                else
                    setRecipeList([]);

            } catch (err) {
                console.error(JSON.parse(JSON.stringify(err)));
            }
        };

        
        if(category === '' && area === '' && ingredient === '' && mealName === '') {
            getRecipe(`randomselection.php`);
        } else if (area !== '') {
            getRecipe(`filter.php?a=${area}`);
            setResult(area);
        } else if (category !== '') {
            getRecipe(`filter.php?c=${category}`);
            setResult(category);
        } else if (ingredient !== '') {
            getRecipe(`filter.php?i=${ingredient}`);
            setResult(ingredient);
        } else if (mealName !== '') {
            getRecipe(`search.php?s=${mealName}`);
            setResult(mealName);
        }

    }, [category, area, ingredient, mealName]);

    return (
      <div className="recipe-results-container">
        <Row className="recipe-container">
        <p id="search-req">Showing results for "{result}"</p>
          {recipeList.map((recipe) => (
            <Col className="recipe-card" lg={5}>
              <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
                <div key={recipe.idMeal}>
                  <Row className="recipe-title">
                    <h4>{recipe.strMeal}</h4>
                  </Row>
                  <Row>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  </Row>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
};

export default SearchResult;