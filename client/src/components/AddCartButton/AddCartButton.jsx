import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/actions/index'

function AddCartButton({ id }) {

    const dispatch = useDispatch();

    function addCart(e){
        e.preventDefault()
        dispatch(addToCart(id));
        console.log(id)
    }

  return <button onClick={(e) => addCart(e)}>Add to cart</button>;
}

export default AddCartButton;
