import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToWishList } from "../../redux/actions";
import { useJwt } from "react-jwt"

export default function WishListButton({ id }) {

    const dispatch = useDispatch()
    const { decodedToken } = useJwt(localStorage.getItem("usuario"))
    let autho = decodedToken?.role
    const wishes = useSelector((state) => state.wishList);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        autho && autho === "user" && setLoading(false)
    }, [decodedToken])

    function addToWish(e) {
        e.preventDefault()
        if (loading === false) {
            if (!wishes.map((a) => a._id).includes(id)) {
                dispatch(addToWishList(id))
                alert("El producto fue agregado a tu lista de deseados")
            } else {
                alert("El producto ya se encuentra en tu lista de deseados")
            }
        }
        if(loading === true){
            alert("Debes estar logueado para usar esta función")
        }
    }

  return (
    <div>
        <button onClick={(e) => addToWish(e)} className="buttonWishlist">Añadir a lista de deseados</button>
    </div>
  )
}
