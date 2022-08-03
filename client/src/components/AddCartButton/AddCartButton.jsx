import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishList } from '../../redux/actions/index'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Style from "./AddCartButton.module.css"
import axios from "axios"
import swal from 'sweetalert';

function AddCartButton({ id }) {

  const dispatch = useDispatch();

  const karting = useSelector((state) => state.cart)

  const cartStorage = async (id) => {
    let json = await axios.get("http://localhost:3000/product/" + id);
    const a = localStorage.getItem("Carrito") ? JSON.parse(localStorage.getItem("Carrito")) : []
    console.log(a)
    a.push(json.data)
    localStorage.setItem("Carrito", JSON.stringify(a))
  }

  function addCart(e) {
    e.preventDefault()
    if (!karting.map((a) => a._id).includes(id)) {
      dispatch(addToCart(id));
    } else {
      swal("Oops","Este producto ya se encuentra en tu carrito!","warning")
    }
    dispatch(removeFromWishList(id))
  }

  return <button className={Style.cartButton} onClick={(e) => {addCart(e); cartStorage(id)}}>
    <div className={Style.karting}><AddShoppingCartIcon style={{ fontSize: "40px" }} /></div>
    <div>Añadir al carrito</div>
  </button>;
}

export default AddCartButton;
