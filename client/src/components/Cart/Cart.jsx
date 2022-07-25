import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteCartButton from "../DeleteCartButton/DeleteCartButton";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  console.log(cart);

  return (
    <div>
      <h1>Carrito</h1>
      {cart.length>0 ? cart.map((e) =>(
        <div>
          <DeleteCartButton id={e._id} />
          <p>{e.name}</p>
          <p>Precio: {e.price}</p>
          <p>Caracteristicas: {e.description}</p>
          <img src={e.image[0].url} />
        </div>
      ))
       : <div>Aun no tienes productos en el Carrito!</div>}
    </div>
  );
}

export default Cart;
