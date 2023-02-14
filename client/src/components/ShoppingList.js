import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MEAL } from "../utils/mutations";

const ShoppingList = ({ shoppingList, setShoppingList }) => {

    // const ingredientList = shoppingList.split( "," );

  return (
    <>
      <h2>Shopping List:</h2>
      {shoppingList.length === 0 ? (
        <p>Your shopping list is currently empty</p>
      ) : (
        <ul>
          {shoppingList.map((ingredient) => (
            <li >{ingredient}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ShoppingList;
