import React, { useState, useEffect } from 'react'
import CreateProduct from '../../CreateProduct/CreateProduct'
import ProductsListAdmin from '../ProductsListAdmin/ProductsListAdmin'
import styles from "./DashBoard.module.css"
import { useJwt } from "react-jwt"
import UsersList from '../UsersList/UsersList'
import PaymentList from '../PaymentList/PaymentList'


export default function DashBoard() {
  const { decodedToken } = useJwt(localStorage.getItem("usuario"))

  let autho = decodedToken?.role
  
  const [first, setfirst] = useState("list")
  const [loading, setLoading] = useState(true)
  
  function handleState(e) {
    e.preventDefault();
    setfirst(e.target.value)
  }
  
  useEffect(() => {
    autho && (autho === "admin" || autho === "owner") && setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken])

    




  return (
    <div>
      {
        loading === false ?
          <div>
            <div className={styles.container}>
              <button className="buttonDashboard" value="create" onClick={(e) => handleState(e)}>Crear nuevo producto</button>
              <button className="buttonDashboard" value="list" onClick={(e) => handleState(e)}>Listado de productos</button>
              <button className="buttonDashboard" value="UsersList" onClick={(e) => handleState(e)}>Lista de usuarios</button>
              <button className="buttonDashboard" value="paymentList" onClick={(e) => handleState(e)}>Lista de pedidos</button>
            </div>
            <div>
              {first === "create" && <CreateProduct></CreateProduct>}
              {first === "list" && <ProductsListAdmin></ProductsListAdmin>}
              {first === "UsersList" && <UsersList></UsersList>}
              {first === "paymentList" && <PaymentList></PaymentList>}

            </div>
          </div>
          :
          <div>Acceso denegado</div>
      }
    </div>
  )
}
