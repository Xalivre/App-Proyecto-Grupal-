import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../../redux/actions';

function RemoveWishButton({id}) {

  const dispatch = useDispatch();

  function removeWish(e){
    e.preventDefault()
    dispatch(removeFromWishList(id));
  }
  return (
    <button onClick={(e) => removeWish(e)}>❌</button>
  )
}

export default RemoveWishButton