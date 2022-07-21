import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../redux/actions/index';


function DeleteCartButton({ id }) {

    const dispatch = useDispatch();

    function deleteCart(e){
        e.preventDefault()
        dispatch(deleteFromCart(id));
        console.log(id)
      }

  return (
    <button onClick={(e) => deleteCart(e)}>Delete</button>
  )
}

export default DeleteCartButton