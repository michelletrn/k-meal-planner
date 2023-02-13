
// const spoonApiKey = process.env.REACT_APP_SPOONACULA_API_KEY;
const theMealDbApiKey = process.env.REACT_APP_THE_MEAL_DB_API_KEY;

// make a search to spoonacular api
// Document https://spoonacular.com/food-api/docs


// API call: https://api.spoonacular.com/recipes/complexSearch
// Example: https://api.spoonacular.com/recipes/complexSearch/?cuisine=Korean&apiKey=spoonApiKey


// https://www.themealdb.com/api.php

export const searchRecipes = (query) => {
  // return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}${query}`);

  return fetch(`https://www.themealdb.com/api/json/v2/${theMealDbApiKey}/${query}`);
};
