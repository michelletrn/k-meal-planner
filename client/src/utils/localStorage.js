export const getSavedMealIds = () => {
  const savedMealIds = localStorage.getItem('saved_meals')
    ? JSON.parse(localStorage.getItem('saved_meals'))
    : [];

  return savedMealIds;
};

export const saveMealIds = (mealIdArr) => {
  if (mealIdArr.length) {
    localStorage.setItem('saved_meals', JSON.stringify(mealIdArr));
  } else {
    localStorage.removeItem('saved_meals');
  }
};

export const removeMealId = (idMeal) => {
  const savedMealIds = localStorage.getItem('saved_meals')
    ? JSON.parse(localStorage.getItem('saved_meals'))
    : null;

  if (!savedMealIds) {
    return false;
  }

  const updatedSavedmealIds = savedMealIds?.filter((savedMealId) => savedMealId !== idMeal);
  localStorage.setItem('saved_meals', JSON.stringify(updatedSavedmealIds));

  return true;
};
