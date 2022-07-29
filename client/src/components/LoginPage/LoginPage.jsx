import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState("");

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const LoginUser = async (payload) => {
    try{
        const user = await axios.post(`http://localhost:3000/accounts`, payload);
        if(user.status === 201) {
            await axios
            .post("http://localhost:3000/login", payload)
            .then((r) => {
              localStorage.setItem("usuario", r.data.tokenSession);
              r.data.data.role === "admin"
                ? navigate("/Dashboard")
                : navigate("/");
            })
        }


    }catch(e){
        if(e.response.data === "Email no encontrado"){
            setErrorLogin("Email no encontrado")
        }
        if(e.response.data === "Contraseña inválida"){
            setErrorLogin("Contraseña inválida")
        }
    }

     
  };

  return (
    <div className={style.container}>
      <div className={style.inputs}>
        <input
          className="input-login"
          type="text"
          placeholder="Correo"
          name="email"
          onChange={handleChange}
        ></input>
        {errorLogin === "Email no encontrado" && <p>{errorLogin}</p>}
        <input
          className="input-login"
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
        ></input>
        {errorLogin === "Contraseña inválida" && <p>{errorLogin}</p>}
        <br />
        <button className="button" onClick={() => LoginUser(info)}>
          Iniciar Sesion
        </button>
        <br />
      </div>
    </div>
  );
}

export default LoginPage;
