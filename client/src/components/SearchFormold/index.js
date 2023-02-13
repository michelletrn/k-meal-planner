import React, { useState, useEffect } from 'react';

import { searchRecipes } from '../../utils/API';
import SearchResult from '../SearchResult';

import './searchForm.css'

const SearchForm = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');    
    const [searchIngredient, setSearchIngredient] = useState('');
    const [searchMealName, setSearchMealName] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedMealName, setSelectedMealName] = useState('');



    const handleSelectChange = (event) => {
        if (event.target.name === 'area') {
            setSelectedArea(event.target.value);
            setSelectedCategory('');
            setSearchIngredient('');
        } else if (event.target.name === 'category') {
            setSelectedCategory(event.target.value);
            setSelectedArea('');   
            setSearchIngredient('');
        } else if (event.target.name === 'ingredient') {
            setSearchIngredient(event.target.value);    
            // console.log(searchIngredient);        
        } else if (event.target.name === 'mealName') {
            setSearchMealName(event.target.value);                
            // console.log(searchMealName);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log("Event: ", event.target.name);
        // if (!selectedCategory && !selectedArea) {
        //     return false;
        // }
        if (event.target.name === 'ingredient') {
            setSelectedIngredient(searchIngredient);
            setSelectedMealName('');    
            // console.log(searchIngredient);        
        } else if (event.target.name === 'mealName') {
            setSelectedMealName(searchMealName);    
            setSelectedIngredient('');
            // console.log("selectedMealName",selectedMealName);
        }  

        
        // console.log("selectedIngredient: ",selectedIngredient);        
        setSelectedCategory('');
        setSelectedArea('');        
        
    };


    useEffect(() => {
        const getCategory = async (query) => {
            try {
                const response = await searchRecipes(query);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const { meals } = await response.json();
                console.log(meals);

                if (query === 'list.php?c=list') {
                    setCategoryList(meals);                                     
                } else {
                    setAreaList(meals);                 
                    
                }

            } catch (err) {
                console.error(JSON.parse(JSON.stringify(err)));
            }
        };

        getCategory('list.php?c=list');
        getCategory('list.php?a=list');

    }, []);

    return (
        <div className='search-container'>
            <div>
                <span> Search by Category: </span>
                <select name="category" onChange={handleSelectChange}>
                    <option value="">Select Category</option>
                    {categoryList.map((category) => (
                        <option key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>{' '}
                <span> Search by Area: </span>
                <select name="area" onChange={handleSelectChange}>
                    <option value="">Select Area</option>
                    {areaList.map((area) => (
                        <option key={area.strArea} value={area.strArea}>
                            {area.strArea}
                        </option>
                    ))}
                </select>
                <span> Search by Ingredient </span>                
                    <input type="text" name="ingredient" onChange={handleSelectChange} />
                    <button type="submit" name="ingredient" onClick={handleFormSubmit}>Search</button>

                    <span> Search by Meal Name </span>                
                    <input type="text" name="mealName" onChange={handleSelectChange} />
                    <button type="submit" name="mealName" onClick={handleFormSubmit}>Search</button>
                
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