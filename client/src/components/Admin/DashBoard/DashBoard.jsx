import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import CreateProduct from '../../CreateProduct/CreateProduct'
import ProductsListAdmin from '../ProductsListAdmin/ProductsListAdmin'
import styles from "./DashBoard.module.css"

export default function DashBoard() {

const dispatch = useDispatch()

const [first, setfirst] = useState("")

function handleState(e) {
    e.preventDefault();
    dispatch(setfirst(e.target.value))
}


  return (
    <div>
      <div className={styles.container}>
        <button className={styles.text}value="create" onClick={(e) => handleState(e)}>Crear nuevo producto</button>
        <button value="list" onClick={(e) => handleState(e)}>Listado de productos</button>
      </div>
        <div>
           {first === "create" &&  <CreateProduct></CreateProduct>}
           {first === "list" && <ProductsListAdmin></ProductsListAdmin>}
        </div>
    </div>
  )
}
