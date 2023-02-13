const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    idMeal: {
        type: String,
        required: true,
        unique: true,
    },
    strMeal: {
        type: String,
        required: true,
    },
    strCategory: { 
        type: String,
        required: true,
    },
    strArea: {
        type: String,
        required: true,
    },
    strInstructions: {
        type: String,
        required: true,
    },
    strMealThumb: {
        type: String,
        required: true,
    },
    strTags: {
        type: [String],
        required: true,
    },
    strYoutube: {
        type: String,
        required: true,
    },
    strIngredient1: {
        type: String,
        required: true,
    },
    strIngredient2: {
        type: String,
        required: true,
    },
    strIngredient3: {
        type: String,
        required: true,
    },
    strIngredient4: {
        type: String,
        required: true,
    },
    strIngredient5: {
        type: String,
        required: true,
    },
    strIngredient6: {
        type: String,
        required: true,
    },
    strIngredient7: {
        type: String,
        required: true,
    },
    strIngredient8: {
        type: String,
        required: true,
    },
    strIngredient9: {
        type: String,
        required: true,
    },
    strIngredient10: {
        type: String,
        required: true,
    },
    strIngredient11: {
        type: String,
        required: true,
    },
    strIngredient12: {
        type: String,
        required: true,
    },
    strIngredient13: {
        type: String,
        required: true,
    },
    strIngredient14: {
        type: String,
        required: true,
    },
    strIngredient15: {
        type: String,
        required: true,
    },
    strIngredient16: {
        type: String,
        required: true,
    },
    strIngredient17: {
        type: String,
        required: true,
    },
    strIngredient18: {
        type: String,
        required: true,
    },
    strIngredient19: {
        type: String,
        required: true,
    },
    strIngredient20: {
        type: String,
        required: true,
    },
    strMeasure1: {
        type: String,
        required: true,
    },
    strMeasure2: {
        type: String,
        required: true,
    },
    strMeasure3: {
        type: String,
        required: true,
    },
    strMeasure4: {
        type: String,
        required: true,
    },
    strMeasure5: {
        type: String,
        required: true,
    },
    strMeasure6: {
        type: String,
        required: true,
    },
    strMeasure7: {
        type: String,
        required: true,
    },
    strMeasure8: {
        type: String,
        required: true,
    },
    strMeasure9: {
        type: String,
        required: true,
    },
    strMeasure10: {
        type: String,
        required: true,
    },
    strMeasure11: {
        type: String,
        required: true,
    },
    strMeasure12: {
        type: String,
        required: true,
    },
    strMeasure13: {
        type: String,
        required: true,
    },
    strMeasure14: {
        type: String,
        required: true,
    },
    strMeasure15: {
        type: String,
        required: true,
    },
    strMeasure16: {
        type: String,
        required: true,
    },
    strMeasure17: {
        type: String,
        required: true,
    },
    strMeasure18: {
        type: String,
        required: true,
    },
    strMeasure19: {
        type: String,
        required: true,
    },
    strMeasure20: {
        type: String,
        required: true,
    },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;