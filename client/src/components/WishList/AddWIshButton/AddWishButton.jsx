import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addToWishList } from '../../../redux/actions';
import Style from "./AddWishButton.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';

function AddWishButton({id}) {

    const [inList,setInList]=useState(0)
    const dispatch = useDispatch()
    const wishList = useSelector((state)=>state.wishList);

    useEffect(()=>{
        wishList.forEach(element => {
            if(element._id === id){
                setInList(1)
            }
        }); 
    })
    // function addToWish(e){
    //     e.preventDefault()
    //     let flag=0;
    //     wishList.forEach(element => {
    //         if(element._id === id){
    //             alert("El producto ya se encuentra en la lista de deseados");
    //             flag = 1;
    //         }
    //     });
    //     if(!flag){
    //         dispatch(addToWishList(id))
    //         // alert("El Producto fue añadido a la lista")
    //     }
    // }
    function addToWish(e){
        e.preventDefault()
        if (inList){
            alert("El producto ya se encuentra en la lista de deseados")
        }
        if(!inList){
            dispatch(addToWishList(id))
            setInList(1)
            // alert("El Producto fue añadido a la lista")
        }
        console.log(inList);
        console.log("log de prueba 2")
    }

  return (
    <button className={Style.cartButton} onClick={(e) => addToWish(e)}>
        <div className={Style.karting}><FavoriteIcon style={{fontSize:"40px"}}/></div>
        {!inList?(<div>Añadir a lista de deseados</div>):(<div>En lista de deseados</div>)}
        
    </button>
  )
}

export default AddWishButton