import React, { useEffect } from "react";
import { addToCart, addToWishList, modifyCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from "./ProductCard.module.css";
/* import AddCartButton from "../AddCartButton/AddCartButton"; */
import { Link } from "react-router-dom";
import axios from "axios"
/* import WishListButton from "../CardButtons/WishListButton"; */







export default function ProductCard({ id, name, price, image }) {
  const dispatch = useDispatch();

  const karting = useSelector((state) => state.cart)
  const wishes = useSelector((state) => state.wishList)


  const f = localStorage.getItem("Carrito") && JSON.parse(localStorage.getItem("Carrito"))


  const refresh = (f) => {
    const w = f.filter(e => e.stock > 0)
    localStorage.setItem("Carrito", JSON.stringify(w))
    dispatch(modifyCart(w))
  }

  useEffect(() => {
    refresh(f)
  }, [])
  
  
  const cartStorage = async (id) => {
    let json = await axios.get("http://localhost:3000/product/" + id);
    const a = localStorage.getItem("Carrito") ? JSON.parse(localStorage.getItem("Carrito")) : []
    console.log(a)
    a.push(json.data)
    localStorage.setItem("Carrito", JSON.stringify(a))
  }

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.container}>
        <div className={Style.cardContainer}>
          <Link to={"/product/" + id}>
            <br />
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
          </Link>

        </div>
        <br />
        <div className={Style.buttonsContainer}>
          <button onClick={() => {
            !karting.map((a) => a._id).includes(id) ? dispatch(addToCart(id)) && cartStorage(id)
             : alert("Este producto ya se encuentra en tu carrito")
          }}
            className="button">Añadir al carrito</button>
          <br />
          {localStorage.getItem("usuario") ? <button onClick={() => {
            !wishes.map((a) => a._id).includes(id) ? dispatch(addToWishList(id)) &&
              alert("El producto fue agregado a tu lista de deseados") : alert("Este producto ya se encuentra en tu lista de deseados")
          }} className="buttonWishlist">Añadir a lista de deseados</button> :
            <button onClick={() => alert("Debes estar logueado para usar esta función")} className="buttonWishlist">Añadir a lista de deseados</button>}
          <br />
        </div>
      </div>
    </div>
  );
}
