import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, viewsUpdate, deleteProduct, clearPage } from "../../redux/actions";
import AddCartButton from "../AddCartButton/AddCartButton";
import AddWishButton from "../WishList/AddWIshButton/AddWishButton";
import Style from "./Details.module.css"

export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {dispatch(clearPage())}
  }, [dispatch, id]);

  return (
    <div>
      {product && (
        <div>
          <div className={Style.container}>
            <img src={product.image && product.image[0].url} alt="img" />
            <div className={Style.namePositioning}>
              <h1>{product.name}</h1>
              <h1>Precio: ${product.price}</h1>
              <AddCartButton id={product._id} />
              <AddWishButton id={product._id} />
            </div>
          </div>
          <div>
            <h1>Caracteristicas</h1>
            <div>{product.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
