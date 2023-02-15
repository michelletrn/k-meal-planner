import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchRecipes } from "../utils/API";
import Auth from "../utils/auth";
import { saveMealIds, getSavedMealIds } from "../utils/localStorage";

// import Cart from '../components/Cart';
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipeContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";

import { useMutation } from "@apollo/client";
import { SAVE_MEAL } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

const MealDetails = () => {
  const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());
  const [savedMeals, setSavedMeals] = useState([]);

  const [state, dispatch] = useRecipeContext();

  const location = useLocation();
  const navigate = useNavigate();

  const { idMeal } = useParams();
  const { products, cart } = state;

  const [currentProduct, setCurrentProduct] = useState({});

  const [mealDetails, setMealDetails] = useState([]);
  const [saveMeal, { error }] = useMutation(SAVE_MEAL);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product.idMeal === idMeal));
    } else if (mealDetails) {
      mealDetails.forEach((meal) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: meal,
        });
      });

      mealDetails.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    // else if (!loading) {
    //   idbPromise('products', 'get').then((indexedProducts) => {
    //     dispatch({
    //       type: UPDATE_PRODUCTS,
    //       products: indexedProducts,
    //     });
    //   });
    // }
    //   }, [products, data, loading, dispatch, idMeal]);
  }, [products, dispatch, idMeal]);

  const getMealDetails = async (query) => {
    try {
      const response = await searchRecipes(query);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { meals } = await response.json();

      const mealData = meals.map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strYoutube: meal.strYoutube,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strTags: meal.strTags,
        strIngredients: [
          meal.strIngredient1,
          meal.strIngredient2,
          meal.strIngredient3,
          meal.strIngredient4,
          meal.strIngredient5,
          meal.strIngredient6,
          meal.strIngredient7,
          meal.strIngredient8,
          meal.strIngredient9,
          meal.strIngredient10,
          meal.strIngredient11,
          meal.strIngredient12,
          meal.strIngredient13,
          meal.strIngredient14,
          meal.strIngredient15,
          meal.strIngredient16,
          meal.strIngredient17,
          meal.strIngredient18,
          meal.strIngredient19,
          meal.strIngredient20,
        ],
        strMeasures: [
          meal.strMeasure1,
          meal.strMeasure2,
          meal.strMeasure3,
          meal.strMeasure4,
          meal.strMeasure5,
          meal.strMeasure6,
          meal.strMeasure7,
          meal.strMeasure8,
          meal.strMeasure9,
          meal.strMeasure10,
          meal.strMeasure11,
          meal.strMeasure12,
          meal.strMeasure13,
          meal.strMeasure14,
          meal.strMeasure15,
          meal.strMeasure16,
          meal.strMeasure17,
          meal.strMeasure18,
          meal.strMeasure19,
          meal.strMeasure20,
        ],
      }));

      setSavedMeals(mealData);

      setMealDetails(meals);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMeal = async (idMeal) => {
    const mealToSave = savedMeals.find((meal) => meal.idMeal === idMeal);
    // const mealToSave = savedMeals[0];

    console.log("mealToSave: ", mealToSave);
    try {
      const { data } = await saveMeal({
        variables: { mealData: mealToSave },
      });

      console.log("data: :", data);

      if (data) {
        setSavedMealIds([...savedMealIds, mealToSave.idMeal]);
      }
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  useEffect(() => {
    getMealDetails(`lookup.php?i=${idMeal}`);
    return () => saveMealIds(savedMealIds);
  });

  useEffect(() => {
    getMealDetails(`lookup.php?i=${idMeal}`);
    return () => saveMealIds(savedMealIds);
  });

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem.idMeal === idMeal);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        idMeal: idMeal,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      //   idbPromise('cart', 'put', {
      //     ...itemInCart,
      //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      //   });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      //   idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      idMeal: currentProduct.idMeal,
    });

    // idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <div>
      <h1>Meal Details</h1>
      {mealDetails.map((meal) => (
        <div key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          {meal.strYoutube && (
            <iframe
              title={`${meal.strMeal} Video`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                -11
              )}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <p>{meal.strInstructions}</p>
          <h3>Category: {meal.strCategory}</h3>
          <h3>Area: {meal.strArea}</h3>
          <h3>Tags: {meal.strTags}</h3>
          <h3>Ingredients : Measurements</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(
              (ingredientNum) => {
                const ingredient = meal[`strIngredient${ingredientNum}`];
                const measurement = meal[`strMeasure${ingredientNum}`];
                if (ingredient && measurement) {
                  return (
                    <li key={ingredientNum}>
                      {ingredient}: {measurement}
                    </li>
                  );
                }
                return null;
              }
            )}
          </ul>
          {Auth.loggedIn() && (
            <>
              <Button
                disabled={savedMealIds?.some(
                  (savedMealId) => savedMealId === meal.idMeal
                )}
                className="btn-block btn-info"
                onClick={() => handleSaveMeal(meal.idMeal)}
              >
                {savedMealIds?.some(
                  (savedMealId) => savedMealId === meal.idMeal
                )
                  ? "This meal has already been saved!"
                  : "Save this Meal!"}
                {/* Save this Meal! */}
              </Button>
              <button onClick={addToCart}>Add to Cart</button>
              <button
                disabled={!cart.find((p) => p.idMeal === currentProduct.idMeal)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            </>
          )}
        </div>
      ))}

      {/* <Cart /> */}

      {location.pathname !== "/" && (
        <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
      )}
    </div>
  );
};

export default MealDetails;
