import React from "react";
import { addToCart, addToWishList } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from "./ProductCard.module.css";
import AddCartButton from "../AddCartButton/AddCartButton";
import { Link } from "react-router-dom";



export default function ProductCard({ id, name, price, image }) {
  const dispatch = useDispatch();

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.container}>
        <div className={Style.cardContainer}>
          <Link to={"/product/" + id}>
            <img className={Style.image} src={image} alt="img" />
            <br /> <br /> 
            <div className={Style.text}>
              <div className={Style.name}>
                {name.length >= 45 ? (
                  <div>{name.slice(0, 45)}...</div>
                ) : (
                  <p>{name}</p>
                )}
              </div>
            </div >

            <p className={Style.price}>${price}</p>
            {/* <AddCartButton id={id} /> */}
          </Link>
        </div>
        <br />
        <div className={Style.buttonsContainer}>
          <button onClick={() => dispatch(addToCart(id))} className="button">Añadir al carrito</button>
          <br />
          <button onClick={() => dispatch(addToWishList(id))} className="buttonWishlist">Añadir a lista de deseados</button>
          <br />
        </div>
      </div>
    </div>

  );
}
