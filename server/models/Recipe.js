const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    idMeal: {
        type: String,
        required: true,
        unique: true,
    },
    strMeal: {
        type: String        
    },
    strCategory: { 
        type: String
    },
    strArea: {
        type: String        
    },
    strInstructions: {
        type: String        
    },
    strMealThumb: {
        type: String        
    },
    strTags: {
        type: [String]        
    },
    strYoutube: {
        type: String        
    },
    strIngredients: {
        type: [String]
    },
    strMeasures: {
        type: [String]        
    }   

});

module.exports = recipeSchema;