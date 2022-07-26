import React from "react";
import { addToCart } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from "./ProductCardAdmin.module.css";
import AddCartButton from "../../AddCartButton/AddCartButton";
import { deleteProduct } from "../../../redux/actions";

export default function ProductCardAdmin({ id, name, price, image }) {
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
          <button
            className={Style.deleteButton}
            type="button"
            href="/products"
            onClick={()=>{
              dispatch(deleteProduct(id));
              alert("Deleted")
            }}
            >
              {" "}
              Eliminar Producto
            </button>
        </div>
      </div>
    </div>
  );
}
