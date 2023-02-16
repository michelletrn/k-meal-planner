import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Col, Row} from "react-bootstrap";


import { searchRecipes } from "../utils/API";
import SearchResult from "../components/SearchResult";

import "./searchForm.css";

const inputReset = (id) => {

  document.getElementById(id).value = "";

};

const selectReset = (id) => {

  document.getElementById(id).selectedIndex = 0;

};



const SearchForm = () => {

  // const [state, dispatch] = useRecipeContext();

  // const { categories, areas, category, area, ingredient, mealName } = state;


  const [categoryList, setCategoryList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchIngredient, setSearchIngredient] = useState("");
  const [searchMealName, setSearchMealName] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedMealName, setSelectedMealName] = useState("");

  const handleSelectChange = (event) => {
    if (event.target.name === "area") {
      setSelectedArea(event.target.value);
      setSelectedCategory("");       
      inputReset("mealName");  
      inputReset("ingredient");  
      selectReset("category");
     
    } else if (event.target.name === "category") {
      setSelectedCategory(event.target.value);
      setSelectedArea("");
      inputReset("mealName");  
      inputReset("ingredient");  
      selectReset("area");      
     
    } else if (event.target.name === "ingredient") {
      setSearchIngredient(event.target.value);
      setSelectedCategory("");
      setSelectedArea("");
     
     
    } else if (event.target.name === "mealName") {
      setSearchMealName(event.target.value);
      setSelectedCategory("");
      setSelectedArea("");
         
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Event: ", event.target.name);
    // if (!selectedCategory && !selectedArea) {
    //     return false;
    // }
    if (event.target.name === "ingredient") {
      setSelectedIngredient(searchIngredient);
      setSelectedMealName("");
      inputReset("mealName");  
      selectReset("category");
      selectReset("area");
      // console.log(searchIngredient);
    } else if (event.target.name === "mealName") {
      setSelectedMealName(searchMealName);
      setSelectedIngredient("");
      inputReset("ingredient");  
      selectReset("category");
      selectReset("area");  
      // console.log("selectedMealName",selectedMealName);
    }

    // console.log("selectedIngredient: ",selectedIngredient);
    setSelectedCategory("");
    setSelectedArea("");    
    
  };

  useEffect(() => {
    const getCategory = async (query) => {
      try {
        const response = await searchRecipes(query);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const { meals } = await response.json();
        // console.log(meals);

        if (query === "list.php?c=list") {
          setCategoryList(meals);
        } else {
          setAreaList(meals);
        }
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    };

    getCategory("list.php?c=list");
    getCategory("list.php?a=list");
  }, []);

  return (
    <div className="container-fluid">
      <div className="search-container">
        <div className="search-small-screen">
          <input
            className="searchbar"
            type="text"
            name="mealName"
            placeholder="Search Recipe"
            onChange={handleSelectChange}
            id="mealName"
          />
          <button
            className="searchbar-btn"
            type="submit"
            name="mealName"
            onClick={handleFormSubmit}
          >
            Search
          </button>
        </div>
        <div>
          <input
            type="text"
            name="ingredient"
            className="searchbar"
            placeholder="Search Ingredient"
            onChange={handleSelectChange}            
            id="ingredient"
          />
          <button
            type="submit"
            className="searchbar-btn"
            name="ingredient"
            onClick={handleFormSubmit}
          >
            Search
          </button>
        </div>
        <div className="filters">
          <select
            name="category"
            className="filter"
            onChange={handleSelectChange}
            id="category"
          >
            <option value="">Category</option>
            
            
             {categoryList.map((category) => (              
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>{" "}
          <select name="area" className="filter" onChange={handleSelectChange} id="area">
            <option value=""> Cuisine</option>
            {areaList.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <SearchResult
          category={selectedCategory}
          area={selectedArea}
          ingredient={selectedIngredient}
          mealName={selectedMealName}
        />
      </div>
    </div>
  );
};

export default SearchForm;
