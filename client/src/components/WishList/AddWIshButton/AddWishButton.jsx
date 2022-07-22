import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addToWishList } from '../../../redux/actions';
import Style from "./AddWishButton.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';

function AddWishButton({id}) {

    const dispatch = useDispatch()
    const wishList = useSelector((state)=>state.wishList);

    function addToWish(e){
        e.preventDefault()
        let flag=0;
        wishList.forEach(element => {
            if(element._id === id){
                alert("El producto ya se encuentra en la lista de deseados");
                flag = 1;
            }
        });
        if(!flag){
            dispatch(addToWishList(id))
            console.log(id)
        }
    }

  return (
    <button className={Style.cartButton} onClick={(e) => addToWish(e)}>
        <div className={Style.karting}><FavoriteIcon style={{fontSize:"40px"}}/></div>
        <div>Añadir a lista de deseados</div>
    </button>
  )
}

export default AddWishButton