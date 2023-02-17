import React from 'react';
import { useRecipeContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useRecipeContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      item: item.item
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        item: item.item
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        item: item.item,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        {/* <img
          src={`/images/${item.image}`}
          alt="item-image"
        /> */}
      </div>
      <div>
        <div>{item.item}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}            
          />
          
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
            style={{ cursor: 'pointer' }}
          >
            🗑️
          </span>
          
        </div>
      </div>
    </div>
  );
}

export default CartItem;
