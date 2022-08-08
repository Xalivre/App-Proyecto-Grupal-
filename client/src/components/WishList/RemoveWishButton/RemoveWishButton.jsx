import React from 'react'
import { useDispatch } from 'react-redux';
import { getUserById, removeFromWishList } from '../../../redux/actions';
import s from "./RemoveWishButton.module.css";
import {useJwt} from "react-jwt"

function RemoveWishButton({id, setRefresh, refresh}) {

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let idUser = decodedToken?._id;

  const dispatch = useDispatch();

  async function removeWish(e){
    e.preventDefault()
    idUser && dispatch(removeFromWishList(idUser, id));
    idUser && await dispatch(getUserById(idUser))
    setRefresh(!refresh)
  }
  return (
    <button className={s.button} onClick={(e) => removeWish(e)}>X</button>
  )
}

export default RemoveWishButton