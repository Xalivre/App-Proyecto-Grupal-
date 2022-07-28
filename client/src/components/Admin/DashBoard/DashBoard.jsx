import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateProduct from '../../CreateProduct/CreateProduct'
import ProductsListAdmin from '../ProductsListAdmin/ProductsListAdmin'
import styles from "./DashBoard.module.css"
import { useJwt } from "react-jwt"

export default function DashBoard() {

  const dispatch = useDispatch()
  const { decodedToken } = useJwt(localStorage.getItem("usuario"))

  let autho = decodedToken?.role
  
  const [first, setfirst] = useState("list")
  const [loading, setLoading] = useState(true)
  
  function handleState(e) {
    e.preventDefault();
    dispatch(setfirst(e.target.value))
  }
  
  useEffect(() => {
    autho && autho === "admin" && setLoading(false)
  }, [decodedToken])

    




  return (
    <div>
      {
        loading === false ?
          <div>
            <div className={styles.container}>
              <button className={styles.text} value="create" onClick={(e) => handleState(e)}>Crear nuevo producto</button>
              <button value="list" onClick={(e) => handleState(e)}>Listado de productos</button>
              {localStorage.getItem("usuario") && <Link to="/home" onClick={() => localStorage.removeItem("usuario")}>
                <button className="button" >Log out</button>
              </Link>}
            </div>
            <div>
              {first === "create" && <CreateProduct></CreateProduct>}
              {first === "list" && <ProductsListAdmin></ProductsListAdmin>}
            </div>
          </div>
          :
          <div>Acceso denegado</div>
      }

    </div>
  )
}
