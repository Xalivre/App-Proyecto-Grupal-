import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LoginUser} from "../../redux/actions"
import {useNavigate} from"react-router-dom"
import axios from "axios"
import style from "./LoginPage.module.css"

function LoginPage() {

   const dispatch = useDispatch();

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    const navigate = useNavigate()

    const LoginUser = async (payload) => {
          const response = await axios.post("http://localhost:3000/login", payload).then(r => {localStorage.setItem("usuario", r.data.tokenSession); r.data.data.role === "admin" ? navigate("/ArmaTuPc") : navigate("/")}) 
      }

    return (
        <div className={style.container}>
            <div className={style.inputs}>
                <input className="input-form" type="text" placeholder="Correo" name="email" onChange={handleChange}></input>
                <input className="input-form" type="text" placeholder="Contraseña" name="password" onChange={handleChange}></input>
                <button className="button" onClick={()=> LoginUser(info)}>Iniciar Sesion</button>
            </div>
        </div>
    )
}

export default LoginPage;
