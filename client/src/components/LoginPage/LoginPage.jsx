import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./LoginPage.module.css";
import { loginRefresher } from "../../redux/actions";

function LoginPage() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState("");

  useEffect(() => {
    setErrorLogin("");
  }, [dispatch]);

  const validate = (info) => {
    let errors = {};

    if (!info.email) {
      errors.email = "Ingresar un email";
    }
    if (!info.password) {
      errors.password = "Ingresar la contraseña";
    }
    return errors;
  };

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...info,
        [e.target.name]: e.target.value,
      })
    );
  };

  const navigate = useNavigate();

  const LoginUser = async (payload) => {
    try {
      const user = await axios.post(`http://localhost:3000/accounts`, payload);
      if (user.status === 201) {
        await axios.post("http://localhost:3000/login", payload).then((r) => {
          localStorage.setItem("usuario", r.data.tokenSession);
          if(r.data.data.accountState === "banned") {
             return alert("Tu cuenta se encuentra en estado de suspensión")
          }
          r.data.data.role === "admin" ? navigate("/Dashboard") : navigate("/");
        });
        dispatch(loginRefresher())
      }
    } catch (e) {
      if (e.response.data === "Email no encontrado") {
        setErrorLogin("Email inválido");
      }
      if (e.response.data === "Contraseña inválida") {
        setErrorLogin("Contraseña inválida");
      }
    }
  };

  return (
    <div className={style.container}>
      <i className={`${style.icon} fa-solid fa-user-large`}></i>
      <h1 style={{textAlign: "center", textTransform: "uppercase", fontWeight: "bold"}}>Inicio de sesión</h1>
      <p>Ingresa con tu cuenta</p>

      <div className={style.inputs}>
      <p>Ingresa tu email :</p>
        <input
          className="input-login"
          type="text"
          placeholder="Correo"
          name="email"
          onChange={handleChange}
        ></input>
        {!errorLogin && !errors.email ? (
          <p className={style.errors1}>soy un error</p>
        ) : info.email.length > 0 && !errorLogin && !errors.email ? (
          <p className={style.errors1}>soy un error</p>
        ) : errorLogin === "Email inválido" ? (
          <p className={style.errors}>{errorLogin}</p>
        ) : errorLogin === "Contraseña inválida" ? (
          <p className={style.errors1}>soy un error</p>
        ) : (
          errors.email && <p className={style.errors}>{errors.email}</p>
        )}
      <p>Ingresa tu contraseña :</p>
        <input
          className={`input-login ${style.input}`}
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
        ></input>
        {!errorLogin && !errors.password ? (
          <p className={style.errors1}>soy un error</p>
        ) : info.password.length > 0 && !errorLogin && !errors.password ? (
          <p className={style.errors1}>soy un error</p>
        ) : errorLogin === "Contraseña inválida" ? (
          <p className={style.errors}>{errorLogin}</p>
        ) : errorLogin === "Email inválido" ? (
          <p className={style.errors1}>soy un error</p>
        ) : (
          errors.password && <p className={style.errors}>{errors.password}</p>
        )}
        <br />
        {!errors.email &&
        info.email.length > 0 &&
        info.password.length > 0 &&
        !errors.password ? (
          <button className="button" onClick={() => LoginUser(info)}>
            Iniciar Sesion
          </button>
        ) : (
          <button
            className="button"
            onClick={() => alert("Completar los campos")}
          >
            Iniciar Sesion
          </button>
        )}
        <br />
      </div>
    </div>
  );
}

export default LoginPage;
