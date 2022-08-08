import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addToWishList, getUserById } from "../../../redux/actions"
import Style from "./AddWishButton.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useJwt } from "react-jwt"
import swal from "sweetalert"

function AddWishButton({ id }) {

    const [inList] = useState(0)
    const dispatch = useDispatch()
    
    const { decodedToken } = useJwt(localStorage.getItem("usuario"))
    let autho = decodedToken?.role
    let idUser = decodedToken?._id

    const userDetails = useSelector((state) => state.userDetails.wishList)
    
    
    useEffect(() => {
        idUser && dispatch(getUserById(idUser))

   },[idUser])

    function addToWish(e) {
        e.preventDefault()
            if (!userDetails.map((a) => a._id).includes(id)) {
                dispatch(addToWishList(id, idUser), console.log(userDetails))
                swal("Listo!","El producto fue agregado a tu lista de deseados","success")
            } else {
                swal("Oops","Este producto ya se encuentra en tu lista","warning")
            }
    }


    return (
        <button className={Style.cartButton} onClick={(e) => 
           ( autho === "admin" || autho === "owner") ? swal("error","Un administrador no puede realizar esta acción","error") :
           autho === undefined ? swal("Atención!", "Debes logearte para hacer eso!", "warning") :
             addToWish(e)}>
            <div className={Style.karting}><FavoriteIcon style={{ fontSize: "40px" }} /></div>
            {!inList ? (<div>Añadir a lista de deseados</div>) : (<div>En lista de deseados</div>)}

        </button>
    )
}

export default AddWishButton