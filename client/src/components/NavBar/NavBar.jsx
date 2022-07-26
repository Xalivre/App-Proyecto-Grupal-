import React, { useState } from 'react'
import { useNavigate, Link, NavLink } from "react-router-dom";
import Style from "./NavBar.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, searchName } from "../../redux/actions/"

function NavBar() {

  const products = useSelector((state) => state.products)
  const allProducts = useSelector((state) => state.allProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <div className={Style.container}>
      <NavLink to="/" style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? Style.navbar_link_active : Style.navbar_link)}>
        <h1>Home</h1>
      </NavLink>
      <NavLink to='/products' onClick={() => dispatch(searchName(""))} style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? Style.navbar_link_active : Style.navbar_link)} >
        <h1 >Productos</h1>
      </NavLink>
      <NavLink to='/ArmaTuPC' style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? Style.navbar_link_active : Style.navbar_link)} >
        <h1>Arma tu PC</h1>
      </NavLink>
      <NavLink to='/help' style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? Style.navbar_link_active : Style.navbar_link)} >
        <h1>Ayuda</h1>
      </NavLink>
    </div>
  )
}

export default NavBar