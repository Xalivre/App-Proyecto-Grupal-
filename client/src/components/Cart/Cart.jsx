import React from "react";
import { useSelector } from "react-redux";
import DeleteCartButton from "../DeleteCartButton/DeleteCartButton";
import styles from "./Cart.module.css"

function Cart() {

  const cart = useSelector((state) => state.cart);

  return (
    <div className={styles.container}>
      <h1>Carrito</h1>
      {cart.length>0 ? cart.map((e) =>(
        <div key={e._id} className={styles.card}>
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
