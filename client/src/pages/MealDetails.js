import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchRecipes } from "../utils/API";
import Auth from "../utils/auth";
import { saveMealIds, getSavedMealIds } from "../utils/localStorage";

import Cart from "../components/Cart";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipeContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import "./MealDetails.css";

import { useMutation } from "@apollo/client";
import { SAVE_MEAL } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

// // Get all the checkboxes in the ordered list
// const checkboxes = document.querySelectorAll('ol input[type="checkbox"]');

// // Create an empty array to store the checked values
// const checkedValues = [];

// // Loop through all the checkboxes and check if they are checked
// checkboxes.forEach(checkbox => {
//   if (checkbox.checked) {
//     // If the checkbox is checked, add its value to the checkedValues array
//     checkedValues.push(checkbox.value);
//   }
// });

// // Log the array of checked values
// console.log("checkedValues: ", checkedValues);

const MealDetails = () => {
  const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());
  const [savedMeals, setSavedMeals] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const [state, dispatch] = useRecipeContext();

  const location = useLocation();
  const navigate = useNavigate();

  const { idMeal } = useParams();
  const { products, cart } = state;

  const [currentProduct, setCurrentProduct] = useState({});

  const [mealDetails, setMealDetails] = useState([]);
  const [saveMeal, { error }] = useMutation(SAVE_MEAL);

  useEffect(() => {
    getMealDetails(`lookup.php?i=${idMeal}`);
    // setShoppingList(checkedValues);
    // checkChangeController();    
  }, []);

  useEffect(() => {
    console.log("savedMealIds: ", savedMealIds);
    saveMealIds(savedMealIds);
  },[savedMealIds]);


  // useEffect(() => {
  //   console.log("Inside useEffect");
  //   if (products.length) {
  //     setCurrentProduct(products.find((product) => product.idMeal === idMeal));
  //   }
  // }, []);

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
      setMealDetails(mealData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMeal = async (idMeal) => {
    const mealToSave = savedMeals.find((meal) => meal.idMeal === idMeal);

    console.log("mealToSave: ", mealToSave);
    try {
      const { data } = await saveMeal({
        variables: { mealData: mealToSave },
      });

      console.log("data: :", data);

      if (data) {
        setSavedMealIds([...savedMealIds, mealToSave.idMeal]);
        // console.log("savedMealIds: ", savedMealIds);
        // saveMealIds(savedMealIds);
      }
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  const addToCart = () => {
    console.log("!!!shoppingList: ", shoppingList);
    // const test = ["abc", "def", "ghi"];
    // const item = "abc";

    shoppingList.forEach((item) => {
      // test.forEach((item) => {
      const itemInCart = cart.find((cartItem) => cartItem.item === item);
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          item,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        console.log("currentProduct: ", item);
        dispatch({
          type: ADD_TO_CART,
          product: { item: item, price: 0.99, purchaseQuantity: 1 },
        });
        idbPromise('cart', 'put', { item: item, price: 0.99, purchaseQuantity: 1 });
      }
    });

    console.log("cart: ", cart);
  };

  const removeFromCart = () => {
    shoppingList.forEach((item) => {
      dispatch({
        type: REMOVE_FROM_CART,
        item: item,
      });
      idbPromise('cart', 'delete', { item });
    });


  };

  const checkChangeController = () => {
    // Get all the checkboxes in the ordered list
    const checkboxes = document.querySelectorAll('ol input[type="checkbox"]');

    // Create an empty array to store the checked values
    const checkedValues = [];

    // Loop through all the checkboxes and check if they are checked
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // If the checkbox is checked, add its value to the checkedValues array
        checkedValues.push(checkbox.value);
      }
    });

    // Log the array of checked values
    setShoppingList(checkedValues);
    console.log("edited checkedValues: ", checkedValues);
    console.log("shoppingList: ", shoppingList);
  };

  // checkChangeController();
  function selects() {
    var ele = document.getElementsByName('ingredient');
    console.log("ele: ", ele);
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == 'checkbox')
        ele[i].checked = true;
    }
    checkChangeController();
  }

  function deSelect() {
    var ele = document.getElementsByName('ingredient');
    console.log("ele: ", ele);
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == 'checkbox')
        ele[i].checked = false;

    }
    checkChangeController();
  }


  return (
    <div>
      <div className="single-recipe-container">
        {location.pathname !== "/" && (
          <button className="btn back-btn" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        {mealDetails.map((meal) => (
          <div key={meal.idMeal} className="recipe-details">
            <h2>{meal.strMeal}</h2>
            <h4>
              {meal.strArea} {meal.strCategory}
            </h4>
            <div className="recipe-screens">
              <div className="recipe-img-vid">
                <img
                  src={meal.strMealThumb}
                  height="275"
                  width="336"
                  alt={meal.strMeal}
                />
                {meal.strYoutube && (
                  <iframe
                    title={`${meal.strMeal} Video`}
                    width="336"
                    height="189"
                    src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "1% 2%",
                }}
              >
                <h3 style={{ textAlign: "center" }}>Instructions</h3>
                <p>{meal.strInstructions}</p>
                {/* <h3>Tags: {meal.strTags}</h3> */}
                <div>
                  <h3>Ingredients: </h3>
                  <ol>
                    {meal.strIngredients.map((ingredient, index) => {
                      if (ingredient) {
                        return (
                          <li key={index}>
                            <input
                              type="checkbox"
                              defaultChecked={false}
                              value={ingredient}
                              name='ingredient'
                              onChange={checkChangeController}
                            />{" "}
                            {ingredient}: {meal.strMeasures[index]}
                          </li>
                        );
                      }
                      return null;
                    })}

                  </ol>
                  <input type="button" onClick={selects} value="Select All" />
                  {' '}
                  <input type="button" onClick={deSelect} value="Deselect All" />


                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                {Auth.loggedIn() && (
                  <button
                    disabled={savedMealIds?.some(
                      (savedMealId) => savedMealId === meal.idMeal
                    )}
                    className="save-btn btn"
                    style={{ fontWeight: "600" }}
                    onClick={() => handleSaveMeal(meal.idMeal)}
                  >
                    {savedMealIds?.some(
                      (savedMealId) => savedMealId === meal.idMeal
                    )
                      ? "Recipe Saved"
                      : "Save Recipe"}
                  </button>
                )}
                <button
                  className="add-btn btn"
                  onClick={addToCart}
                  style={{ fontWeight: "600" }}
                >
                  Add to Cart
                </button>
                {/* <button
                  className="remove-btn btn"
                  style={{ fontWeight: "600" }}
                  disabled={
                    !cart.find((p) => p.idMeal === currentProduct.idMeal)
                  }
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </button> */}
              </div>
            </div>
          </div>
        ))}

        <Cart />
      </div>
    </div>
  );
};

export default MealDetails;
