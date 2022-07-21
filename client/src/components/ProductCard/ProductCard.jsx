import React from "react";
import { addToCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from "./ProductCard.module.css";
import AddCartButton from "../AddCartButton/AddCartButton";

export default function ProductCard({ id, name, price, image }) {
  const dispatch = useDispatch();

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.cardContainer}>
        <img className={Style.image} src={image} alt="img" />
        <div className={Style.text}>
          <div className={Style.name}>
            {name.length >= 45 ? (
              <div>{name.slice(0, 45)}...</div>
            ) : (
              <p>{name}</p>
            )}
          </div>
          <p className={Style.price}>${price}</p>
          {/* <AddCartButton id={id} /> */}
          <button className="button">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
