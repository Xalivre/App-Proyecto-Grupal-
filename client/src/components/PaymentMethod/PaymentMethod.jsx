import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Style from "./PaymentMethod.module.css"
import DeleteCartButton from "../DeleteCartButton/DeleteCartButton";
import { modifyQuantityUp, modifyQuantityDown } from '../../redux/actions';

export default function PaymentMethod() {

  const dispatch = useDispatch()

  const karting = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem("Carrito", JSON.stringify(karting))
  }, [karting])

  const modifyQuantityUpFunction = (id) => {
    dispatch(modifyQuantityUp(id))
  }

  const modifyQuantityDownFunction = (id) => {
    dispatch(modifyQuantityDown(id))
  }

  return (
    <div>
      {
        karting && karting.map(e => {
          return (
            <div className={Style.container}>
              <div className={Style.cartProducts}>
                <img className={Style.image} src={e.image[0]?.url} alt=":P" />
                <div className={Style.text}>{e.name}</div>
                <div>${e.price * e.quantity}</div>
                <div>
                  <button onClick={() => modifyQuantityDownFunction(e._id)}>-</button>
                  <button>{e.quantity}</button>
                  <button onClick={() => modifyQuantityUpFunction(e._id)}>+</button>
                </div>
                <DeleteCartButton id={e._id} />
              </div>
            </div>
          )
        })
      }
      <div className={Style.positioning}>Total: ${karting?.map(e => (e.price * e.quantity)).reduce((a, b) => a + b, 0)}</div>
      <br/><br/><br/>
      <div className={Style.paymentButtons}>
        <Link to="/paymentMethod/Checkout"><button>Stripe</button></Link>
        <p> o </p>
        <Link to="#"><button>Mercadopago</button></Link>
      </div>
      <br/>
    </div>
  )
}
