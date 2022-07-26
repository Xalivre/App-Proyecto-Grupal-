import React from "react";
import { useDispatch } from "react-redux";
import { addToCart,removeFromWishList } from '../../redux/actions/index'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Style from "./AddCartButton.module.css"

function AddCartButton({ id }) {
  
  const dispatch = useDispatch();

    function addCart(e){
        e.preventDefault()
        dispatch(addToCart(id));
        dispatch(removeFromWishList(id))
    }

  return <button className={Style.cartButton} onClick={(e) => addCart(e)}>
    <div className={Style.karting}><AddShoppingCartIcon style={{fontSize:"40px"}}/></div>
    <div>Añadir al carrito</div>

    {/* <i class="fa-solid fa-cart-plus"></i> */}
    {/* <p>Add to cart</p> */}
  </button>;
}

export default AddCartButton;
