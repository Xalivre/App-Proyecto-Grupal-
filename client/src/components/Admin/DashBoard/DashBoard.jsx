import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import CreateProduct from '../../CreateProduct/CreateProduct'
import ProductsListAdmin from '../ProductsListAdmin/ProductsListAdmin'
import styles from "./DashBoard.module.css"

export default function DashBoard() {

const dispatch = useDispatch()

const [first, setfirst] = useState("list")

function handleState(e) {
    e.preventDefault();
    dispatch(setfirst(e.target.value))
}


  return (
    <div>
      <div className={styles.container}>
        <button className={styles.text}value="create" onClick={(e) => handleState(e)}>Crear nuevo producto</button>
        <button value="list" onClick={(e) => handleState(e)}>Listado de productos</button>
        { localStorage.getItem("usuario") && <Link to="/home" onClick={() => localStorage.removeItem("usuario")}>
        <button className="button" >Log out</button>
        </Link>}
      </div>
        <div>
           {first === "create" &&  <CreateProduct></CreateProduct>}
           {first === "list" && <ProductsListAdmin></ProductsListAdmin>}
        </div>
    </div>
  )
}
