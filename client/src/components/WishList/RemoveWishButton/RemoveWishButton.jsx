import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../../redux/actions';
import s from "./RemoveWishButton.module.css";

function RemoveWishButton({id}) {

  const dispatch = useDispatch();

  function removeWish(e){
    e.preventDefault()
    dispatch(removeFromWishList(id));
  }
  return (
    <button className={s.button} onClick={(e) => removeWish(e)}>X</button>
  )
}

export default RemoveWishButton