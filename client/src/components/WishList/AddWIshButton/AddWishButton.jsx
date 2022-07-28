import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addToWishList } from '../../../redux/actions';
import Style from "./AddWishButton.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';

function AddWishButton({id}) {

    const [inList,setInList]=useState(0)
    const dispatch = useDispatch()
    const wishes = useSelector((state)=>state.wishList);

    function addToWish(e){
        e.preventDefault()
        if(!wishes.map((a) => a._id).includes(id)) {
            dispatch(addToWishList(id))
            alert("El producto fue agregado a tu lista de deseados")
        } else {
            alert("El producto ya se encuentra en tu lista de deseados")
        }
    }
    

  return (
    <button className={Style.cartButton} onClick={(e) => addToWish(e)}>
        <div className={Style.karting}><FavoriteIcon style={{fontSize:"40px"}}/></div>
        {!inList?(<div>Añadir a lista de deseados</div>):(<div>En lista de deseados</div>)}
        
    </button>
  )
}

export default AddWishButton