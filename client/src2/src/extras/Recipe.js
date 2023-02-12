import React, { useState, useEffect } from "react";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${props.recipeId}/information?apiKey=a3a46b695fab4d10b5a00438d9047b51`
    )
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [props.recipeId]);

  console.log(recipe);

  return (
    <div>
      <div>
        <h1>{recipe.title}</h1>
      </div>
      <div>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div>
        <h4>Ingredients</h4>
        {/* <ul>
          {recipe.extendedIngredients.map((ingredient) => {
            return <li> {ingredient.original} </li>;
          })}
        </ul> */}
      </div>
      <div>
        <h4>Instructions</h4>
        {/* <ul>
          {recipe.analyzedInstructions[0].steps.map((step) => {
            return <li> {step.step} </li>;
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default Recipe;
