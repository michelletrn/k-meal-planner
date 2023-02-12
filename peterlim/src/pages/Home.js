
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

import { searchRecipes } from '../utils/API';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];


  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');


  const [searchedCategories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [total, setTotalResults] = useState(0);

  const handleFormSubmit = (async (query) => {
    // const query = "categories.php";

    try {
      const response = await searchRecipes(query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { categories } = await response.json();

      console.log("categories: ", categories);
      setCategories(categories);


    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }

  });

  // handleFormSubmit();

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <p>Result: {searchedCategories.map((category) => (
            <div>
              <p>Category: {category.strCategory}</p>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <p>Description: {category.strCategoryDescription}</p>
            </div>


          ))} </p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleFormSubmit('categories.php')}
          >
            Search
          </button>

          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
