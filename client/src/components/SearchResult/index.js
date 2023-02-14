

import React, { useState, useEffect } from 'react';

import { searchRecipes } from '../../utils/API';
import { Link } from 'react-router-dom';

const SearchResult = ({category, area, ingredient, mealName}) => {

    const [recipeList, setRecipeList] = useState([]);

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

            } catch (err) {
                console.error(JSON.parse(JSON.stringify(err)));
            }
        };

        
        if(category === '' && area === '' && ingredient === '' && mealName === '') {
            getRecipe(`randomselection.php`);
        } else if (area !== '') {
            getRecipe(`filter.php?a=${area}`);
        } else if (category !== '') {
            getRecipe(`filter.php?c=${category}`);
        } else if (ingredient !== '') {
            getRecipe(`filter.php?i=${ingredient}`);
        } else if (mealName !== '') {
            getRecipe(`search.php?s=${mealName}`);
        }

    }, [category, area, ingredient, mealName]);

    return (
        <div>
    
            {recipeList.map((recipe) => (
                <Link
                    to={`/recipe/${recipe.idMeal}`}
                    key={recipe.idMeal}
                >
                <div key={recipe.idMeal}>
                    <h2>{recipe.strMeal}</h2>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />  
                </div>
                </Link>
            ))}

        </div>
    );
};

export default SearchResult;