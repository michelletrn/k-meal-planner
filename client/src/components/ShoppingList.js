import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MEAL } from "../utils/mutations";
import * as Icon from "react-bootstrap-icons";

const ShoppingList = ({ shoppingList, setShoppingList }) => {
  const uniqueIngredients = Array.from(new Set(shoppingList));
  const emailBody = uniqueIngredients.join("%0D%0A");

  const handleDelete = (index) => {
    setShoppingList((prevList) =>
      prevList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  return (
    <>
      <h2>Shopping List:</h2>
      {shoppingList.length === 0 ? (
        <p>Your shopping list is currently empty</p>
      ) : (
        <ul>
          {uniqueIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <div
                className="removeIngredientBtn"
                onClick={() => handleDelete(index)}
              >
                <Icon.Trash style={{ width: "25px", height: "25px" }}>
                  Remove Ingredient
                </Icon.Trash>
              </div>
            </li>
          ))}
        </ul>
      )}
      <a href={`mailto:?subject=My Shopping List&body=${emailBody}`}>
        <button>Send Shopping List via Email</button>
      </a>
    </>
  );
};

export default ShoppingList;
