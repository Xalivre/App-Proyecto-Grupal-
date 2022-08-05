import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { finishOrder } from '../../redux/actions/index.js'
import Style from "./PaymentMercaPago.module.css"
import { useJwt } from "react-jwt";

export default function PaymentMercaPago() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const stateFinishOrder = useSelector((state) => state.finishOrder)
    const [items, setItems] = useState({})
    
    

    const formMercadoPago = cart?.map((product) => ({
        id: product._id,
        title: product.name,
        description: product.description,
        picture_url: product.image[0].url,
        category_id: product.category,
        quantity: product.quantity,
        unit_price: product.price  
    }))


    var total = 0;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            total = total + cart[i].price;
        }
    }

    const { decodedToken, isExpired } = useJwt(localStorage.getItem("usuario"));
    let emailUser  
    if(decodedToken) {
        emailUser = decodedToken.email
    }

    useEffect(() => {
        if(stateFinishOrder?.data){
            window.location.href = stateFinishOrder?.data
        }
      }, [stateFinishOrder])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formMercadoPago, "HOLAAAAAA AHREEEEE")
        if(cart.length > 0){
            dispatch(finishOrder(emailUser, formMercadoPago/*, total*/))   
        }
    }

    return (
        <div>
    <Link to="/paymentMethod"><button>VOLVER</button></Link>
    <br/><br/><br/>
    <form onSubmit={handleSubmit} className={Style.formulario}>
      <center><h1>Realizar pago</h1></center>
      <div className={Style.contenedor}>
        <label>First Name:</label>
        <div className={Style.inputcontenedor}>
        <input type="text" required/>
        </div>
        <label>Last Name:</label>
        <div className={Style.inputcontenedor}>
        <input type="text" required/>
        </div>
        <label>Email:</label>
        <div className={Style.inputcontenedor}>
        <input type="text" required/>
        </div>
        <label>Location:</label>
        <div className={Style.inputcontenedor}>
        <input type="text" required/>
        </div>
        <label>Card:</label>
        <div className={Style.inputcontenedor}>
        </div>
        <br />
      </div>
      <a href={stateFinishOrder?.data ? stateFinishOrder.data : null}>
        <button type='submit'>Comprar</button>
        </a>
    </form>
    <br/><br/><br/>
  </div>
  )
}