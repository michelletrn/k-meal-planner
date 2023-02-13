import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

// import API call
import { searchRecipes } from '../utils/API';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = async () => {
  // const [searchedRecipes, setSearchedRecipes] = useState([]);
  // const [recipeCount, setRecipeCount] = useState(0);
  // const [total, setTotalResults] = useState(0);


  // // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // // const thoughts = data?.thoughts || [];

  // const query = "&cuisine=Korean";
  const handleFormSubmit = (async () => {

    // try {
    //   const response = await searchRecipes(query);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const { results, number, totalResults } = await response.json();

    //   console.log("results: ", results);
    //   console.log("number: ", number);
    //   console.log("totalResults: ", totalResults);

    //   setSearchedRecipes(results);
    //   setRecipeCount(number);
    //   setTotalResults(totalResults);


    // } catch (err) {
    //   console.error(JSON.parse(JSON.stringify(err)));
    // }
  });


  return (
    <main>
      <div className="flex-row justify-center">

      {/* <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value=""
                  onChange=""
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form> */}

        <p> Total:  </p>
        {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
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
        </div> */}
      </div>
    </main>
  );
};

export default Home;
