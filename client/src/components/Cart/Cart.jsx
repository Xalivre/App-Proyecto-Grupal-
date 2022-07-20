import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  console.log(cart);

  return (
    <div>
      <h1>MI CARRITO</h1>
      {cart.length>0 ? cart.map((e) =>(
        <div>
          <p>{e.name}</p>
          <p>{e.price}</p>
          <p>{e.description}</p>
          <img src={e.image} />
        </div>
      ))
       : <div>NO TENGO NADA</div>}
    </div>
  );
}

export default Cart;
