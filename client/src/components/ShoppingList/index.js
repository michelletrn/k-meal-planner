import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MEAL } from "../../utils/mutations";
import * as Icon from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
} from "react-bootstrap";

import "./ShoppingList.css";

const ShoppingList = ({ shoppingList, setShoppingList }) => {
  const emailBody = shoppingList.join("%0D%0A");

  const handleDelete = (index) => {
    setShoppingList((prevList) =>
      prevList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleFilter = () => {
    const filteredList = shoppingList.filter((item) => item !== null);
    const uniqueList = [...new Set(filteredList)];
    setShoppingList(uniqueList);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={4}>
            <button
              // onClick={() => handleAddToShoppingList(getIngredients(recipe))}
              onClick={() => handleFilter()}
            >
              Add to Shopping List
            </button>
          </Col>
          <Col lg={4}>
            <ButtonGroup>
              <Button
                size="lg"
                href={`mailto:?subject=My Shopping List&body=${emailBody}`}
              >
                Email Your List!
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="ingredient-row">
          {shoppingList.length === 0 ? (
            <Row>
              <p>Your shopping list is currently empty</p>
            </Row>
          ) : (
            shoppingList.map((ingredient, index) => (
              <Col lg={4}>
                <Card class>
                  <Card.Body>
                    <Card.Title>{ingredient}</Card.Title>
                  </Card.Body>

                  <div
                    className="removeIngredientBtn"
                    onClick={() => handleDelete(index)}
                  >
                    <Icon.Trash style={{ width: "25px", height: "25px" }}>
                      Remove Ingredient
                    </Icon.Trash>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default ShoppingList;
