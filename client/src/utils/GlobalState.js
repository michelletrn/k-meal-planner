import React, { createContext, useState, useContext, useEffect } from "react";
import { useRecipeReducer } from './reducers'
import { searchRecipes } from "./API";

const RecipeContext = createContext();
const { Provider } = RecipeContext;

const RecipeProvider = ({ value = [], ...props }) => {

    // const [categories, setCategoryList] = useState([]);
    // const [areas, setAreaList] = useState([]);

    // useEffect(async () => {
    //     const getMeal = async (query) => {
    //         try {
    //             const response = await searchRecipes(query);
        
    //             if (!response.ok) {
    //                 throw new Error("something went wrong!");
    //             }
        
    //             const { meals } = await response.json();
    //             // console.log("Meal: ",meals);
        
    //             return meals;
    //         } catch (err) {
    //             console.error(JSON.parse(JSON.stringify(err)));
    //         }
    //     };
        
    //     setCategoryList(await getMeal("list.php?c=list"));
    //     setAreaList(await getMeal("list.php?a=list"));
    // }, []);

    const initialState = {
        
        categories: [],
        // areas,
        
        products: [],
        cart: [],
        cartOpen: false,
        
        currentCategory: '',
        category: '',
        area: '',
        ingredient: '',
        mealName: '',

    };

    // console.log("categories: ", initialState.categories);
    // console.log("areas: ", initialState.areas);

    const [state, dispatch] = useRecipeReducer(initialState);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useRecipeContext = () => {
    return useContext(RecipeContext);
};

export { RecipeProvider, useRecipeContext };
