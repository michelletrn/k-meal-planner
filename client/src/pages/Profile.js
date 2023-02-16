import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MEAL } from "../utils/mutations";
import * as Icon from "react-bootstrap-icons";
import { Row, Col } from "react-bootstrap";
import Cart from '../components/Cart';
import "./Profile.css";
// import ShoppingList from "../components/ShoppingList/ShoppingList";
// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { removeMealId } from "../utils/localStorage";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  const [shoppingList, setShoppingList] = useState([]);
  // shopping list will look like this: ["celery", "onion", "carrot", "orange"]

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [removeMeal, { error }] = useMutation(REMOVE_MEAL);

  const userData = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours

  const getIngredients = (recipe) => {
    const ingredients = [];

    // for (let i = 1; i <= 20; i++) {
    //   const ingredient = recipe["strIngredient" + i];
    //   const measure = recipe["strMeasure" + i];
    //   if (ingredient) {
    //     ingredients.push(`${ingredient} - ${measure}`);
    //   }
    // }

    ingredients.push(recipe.strIngredients);
    console.log(ingredients);
    return ingredients;
  };

  // const handleAddToShoppingList = (ingredients) => {
  //   setShoppingList((prevShoppingList) => [
  //     ...prevShoppingList,
  //     ...ingredients,
  //   ]);
  // };

  const handleDeleteMeal = async (idMeal) => {
    try {
      const { data } = await removeMeal({
        variables: { idMeal },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }

      // upon success, remove meal's id from localStorage
      removeMealId(idMeal);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="recipe-results-container">
      <Row className="recipe-container">
        <h4>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${
                userData.savedRecipes.length === 1 ? "recipe" : "recipes"
              }:`
            : "You have no saved Recipes!"}
        </h4>
        {userData.savedRecipes.map((recipe) => (
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
            <div>
              <div
                className="unsave-btn"
                onClick={() => handleDeleteMeal(recipe.idMeal)}
              >
                <Icon.Trash style={{ width: "25px", height: "25px" }}>
                  Unsave Recipe
                </Icon.Trash>
              </div>

              {/* add to cart btn will go here */}
              {/* <button
                // onClick={() => handleAddToShoppingList(getIngredients(recipe))}
                onClick={() => handleAddToShoppingList(recipe.strIngredients)}
              >
                Add to Shopping List
              </button> */}
            </div>
          </Col>
        ))}
      </Row>
      {/* <ShoppingList
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
      /> */}
      <Cart />
    </div>
  );
};

export default Profile;
