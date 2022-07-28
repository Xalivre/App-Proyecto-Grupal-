import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { getUserPayments } from "../../redux/actions";
import Style from "./Profile.module.css"

export default function Profile() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let email = decodedToken?.email;

  const dispatch = useDispatch();

  console.log(decodedToken)

  useEffect(() => {
    email && email.match(pattern) && dispatch(getUserPayments(email));
  }, [decodedToken]);

  const Payments = useSelector((state) => state.userPayments);

  return (
    <div>
        <div className={Style.title}>
        <br/>
            Información de la cuenta
            <div className={Style.profileInfo}>
              <br/><br/>
              <div>Nombre de Usuario: {decodedToken?.username}</div>
              <div>Correo Electrónico: {decodedToken?.email}</div>
              <div>Dirección de Facturación: </div>
              <div>Codigo postal: </div>
              <div>Localidad: </div>
              <div>Nro. de Teléfono: </div>
              <br/><br/>
            </div>
            Historial de Compras
            <br/><br/>
        </div>
      <div>
        {Payments &&
          Payments.map((e) => e.container).map((p) =>
            p.map((x) => {
              console.log(x.name);
              return (
                <div className={Style.container}>
                  <div className={Style.positioning}>
                    <img className={Style.Pimg} src={x.image[0]?.url}/>
                    <div>{x.name}</div>
                    <div>${x.price}</div>
                  </div>
                </div>
              );
            })
          )}
      </div>
    </div>
  );
}
