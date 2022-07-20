import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import s from "./NavBar.module.css"

function NavBar() {
  return (
    <div className={s.container}>
        <Link to='/products' style={{textDecoration: 'none'}} className={s.text}>
            <h1>Productos</h1>
        </Link>
        <Link to='/create' style={{textDecoration: 'none'}} className={s.text}>
            <h1>Arma tu PC</h1>
        </Link>
        <Link to='/help' style={{textDecoration: 'none'}} className={s.text}>
            <h1>Ayuda</h1>
        </Link>
    </div>
  )
}

export default NavBar