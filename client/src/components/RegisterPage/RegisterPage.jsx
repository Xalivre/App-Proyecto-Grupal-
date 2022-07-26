import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {postUser} from "../../redux/actions"
import Style from "./RegisterPage.module.css"
function RegisterPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (input) => {
        let errors = {};

        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        let number = document.getElementById("number")
        let upper = document.getElementById("upper")
        let lower = document.getElementById("lower")
        let length = document.getElementById("length")
        let user = document.getElementById("user")
        let mail = document.getElementById("mail")

        if(input.username.length < 4 || input.username.length > 15){
            errors.username = "El Nombre de Usuario debe tener entre 4 y 15 caracteres"
            user.style.color = "red"
        } else {
            user.style.color = "green"
        }
        if(!input.email.match(pattern)){
            errors.email = "Ingresa un correo válido"
            mail.style.color = "red"
        } else {
            mail.style.color = "green"
        }
        if(input.password.match(/[0-9]/)){
            number.style.color = "green"
        } else {
            errors.password = "Debe contener al menos un número"
            number.style.color = "red"
        }
        if(input.password.match(/[a-z]/)){
            lower.style.color = "green"
        } else {
            errors.password = "Debe contener al menos una letra minúscula"
            lower.style.color = "red"
        }
        if(input.password.match(/[A-Z]/)){
            upper.style.color = "green"
        } else {
            errors.password = "Debe contener al menos una letra mayúscula"
            upper.style.color = "red"
        }
        if(input.password.length < 8 || input.password.length > 30){
            errors.password = "Debe tener entre 8 y 30 caracteres"
            length.style.color = "red"
        } else {
            length.style.color = "green"
        }
        return errors
    }

    const [errors, setErrors] = useState({})

    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
        setErrors(
            validate({
            ...info,
            [e.target.name] : e.target.value
        })
        )
        console.log(errors)
    }

    return (
        <div className={Style.container}>
            <div className={Style.inputs}>
                <input className="input-register" value={info.username} type="text" placeholder="Nombre de Usuario" name="username" onChange={ (e) => handleChange(e)}></input>
                <div>
                    <ul>
                        <li id="user">El Nombre de Usuario debe tener entre 4 y 15 caracteres</li>
                    </ul>
                </div>
                <input className="input-register" type="text" placeholder="Correo" name="email" onChange={handleChange}></input>
                <div>
                    <ul>
                        <li id="mail">Ingresa un correo válido</li>
                    </ul>
                </div>
                <input className="input-register" type="text" placeholder="Contraseña" name="password" onChange={handleChange}></input>
                <div>
                    <ul>
                        <li id="number">Debe contener al menos un número</li>
                        <li id="upper">Debe contener al menos una letra mayúscula</li>
                        <li id="lower">Debe contener al menos una letra minúscula</li>
                        <li id="length">Debe tener entre 8 y 30 caracteres</li>
                    </ul>
                </div>
                {
                    !errors.username && !errors.email && !errors.password ? <button className="button" onClick={()=> {dispatch(postUser(info)); alert("Cuenta creada con éxito"); navigate("/Login")}}>Registrarse</button>
                    : 
                    <button className="button" disabled>Registrarse</button>
                }
                
            </div>
        </div>
    )
}

export default RegisterPage;