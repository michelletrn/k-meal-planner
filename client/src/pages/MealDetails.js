import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchRecipes } from '../utils/API';
import Auth from '../utils/auth';
import { saveMealIds, getSavedMealIds } from '../utils/localStorage';
import { Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_MEAL } from '../utils/mutations';

const MealDetails = () => {
    const { idMeal } = useParams();
    const [mealDetails, setMealDetails] = useState([]);
    const [count, setCount] = useState(1);
    const [saveMeal, {error}] = useMutation(SAVE_MEAL);

    // create state to hold saved mealId values
    const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());

    const getMealDetails = async (query) => {
        try {
            const response = await searchRecipes(query);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const { meals } = await response.json();
            setMealDetails(meals);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMeal = async (idMeal) => {

        const mealToSave = mealDetails.find((meal) => meal.idMeal === idMeal);

        try {
            const { data } = await saveMeal({
                variables: { mealData: mealToSave },
            });

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
    }, []);

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
                            src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
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
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((ingredientNum) => {
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
                        })}
                    </ul>
                    {Auth.loggedIn() && (
                    <Button
                      disabled={savedMealIds?.some((savedMealId) => savedMealId === meal.idMeal)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMeal(meal.idMeal)}>
                      {savedMealIds?.some((savedMealId) => savedMealId === meal.idMeal)
                        ? 'This meal has already been saved!'
                        : 'Save this Meal!'}
                    </Button>
                   )}
                </div>
            ))}
            

        </div>
    );
};

export default MealDetails;
