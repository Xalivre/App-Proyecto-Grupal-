import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromWishList } from '../../redux/actions/index'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Style from "./AddCartButton.module.css"

function AddCartButton({ id }) {
  
  const dispatch = useDispatch();

  const karting = useSelector((state) => state.cart)


    function addCart(e){
        e.preventDefault()
        if(!karting.map((a) => a._id).includes(id)){
          dispatch(addToCart(id));
        } else {
          alert("Este producto ya se encuentra en tu carrito")
        }
          dispatch(removeFromWishList(id))
        }

  return <button className={Style.cartButton} onClick={(e) => addCart(e)}>
    <div className={Style.karting}><AddShoppingCartIcon style={{fontSize:"40px"}}/></div>
    <div>Añadir al carrito</div>
  </button>;
}

export default AddCartButton;
