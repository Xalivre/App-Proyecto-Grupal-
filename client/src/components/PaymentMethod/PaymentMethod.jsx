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
      <Link to="/paymentMethod/Checkout"><button>Stripe</button></Link>
      <p> o </p>
      <Link to="/paymentMethod/MercadoPago"><button>Mercadopago</button></Link>
      <div className={Style.all}>
        <div className={Style.uno}>
          <div className={Style.titleCar}>
            <p className={Style.titlep}>Carrito De Compras</p>
            <hr />
          </div>
          <div className={Style.containerStyles}>
            <div className={Style.containerCards}>
              {
                karting && karting.map(e => {
                  return (
                    <div className={Style.cartProducts}>
                      <img className={Style.image} src={e.image[0]?.url} alt=":P" />
                      <div className={Style.text}>{e.name}</div>
                      <div className={Style.quantity}>
                        <button className={Style.menos} onClick={() => modifyQuantityDownFunction(e._id)}>-</button>
                        <p>{e.quantity}</p>
                        <button className={Style.mas} onClick={() => modifyQuantityUpFunction(e._id)}>+</button>
                      </div>
                      <div className={Style.price}>${e.price * e.quantity}</div>
                      <DeleteCartButton className={Style.btnX} id={e._id} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className={Style.dos}>
          <div className={Style.compra}>
            <p className={Style.titlep}>Tu Compra</p>
            <hr />
          </div>
          <div className={Style.paymentButtons}>
            <p className={Style.positioning}>Total: ${karting?.map(e => (e.price * e.quantity)).reduce((a, b) => a + b, 0)}</p>
            <Link to="/paymentMethod/Checkout"><button className="button">Stripe</button></Link>
            <p> o </p>
            <Link to="#"><button className="button">Mercadopago</button></Link>
          </div>
          <br />
        </div>
      </div>
    </div>
    </div>
  )
}
