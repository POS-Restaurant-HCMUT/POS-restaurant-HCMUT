import React from "react";
import {DishesInCart} from './CartData'

export const addToCart = (dish, quantity) => {
  DishesInCart.push({dish, quantity});
}

function Order() {
  return (
    <div className="page-heading">
      <h1>Order</h1>
      {console.log(DishesInCart[0])}
    </div>
  );
}

export default Order;