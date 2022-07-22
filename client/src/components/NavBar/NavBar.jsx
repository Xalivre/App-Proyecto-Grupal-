import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import Style from "./NavBar.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/actions/"

function NavBar() {

  const products = useSelector((state) => state.products)
  const allProducts = useSelector((state) => state.allProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <div className={Style.container}>
      <Link to="/" style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Home</h1>
      </Link>
      <Link to='/products' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1 onClick={(e) => dispatch(getProducts(e))}>Productos</h1>
      </Link>
      <Link to='/create' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Arma tu PC</h1>
      </Link>
      <Link to='/help' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Ayuda</h1>
      </Link>
    </div>
  )
}

export default NavBar