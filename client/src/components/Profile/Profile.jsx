import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { getUserPayments, getUsers } from "../../redux/actions";
import { Link } from "react-router-dom"
import Style from "./Profile.module.css"

export default function Profile() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let email = decodedToken?.email;

  const dispatch = useDispatch();



  useEffect(() => {
    email && email.match(pattern) && dispatch(getUserPayments(email));
    console.log(decodedToken)
  }, [decodedToken]);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const Payments = useSelector((state) => state.userPayments);
  const users = useSelector((state) => state.users)
  const userExtraInfo = users.find(e => e.email === email)

  return (
    <div className={Style.containerAll}>
      <div className={Style.title}>
        <p className={Style.titlep}>Información de la cuenta</p>
        <div className={Style.profileInfo}>
          <p> Nombre de Usuario <br/> <span className={Style.span}> {decodedToken?.name || decodedToken?.username}</span></p>
          <p>Correo Electrónico<br/> <span className={Style.span}>{decodedToken?.email}</span></p>
          <p>Dirección de Facturación <br/> <span className={Style.span}>{userExtraInfo?.address ? userExtraInfo.address : 'Sin definir'}</span> </p>
          <p>Codigo postal <br/> <span className={Style.span}>{userExtraInfo?.zipCode ? userExtraInfo.zipCode : 'Sin definir'}</span></p>
          <p>Localidad <br/> <span className={Style.span}>{userExtraInfo?.location ? userExtraInfo.location : 'Sin definir'}</span></p>
          <p>Nro. de Teléfono <br/></p>
        </div>
      </div>
      <div className={Style.comprasHistory}>
        <p className={Style.titlep}>Historial de Compras</p>
        {Payments.length &&
          Payments.map((e) => {
            return (
              <div className={Style.container}>
                <p className={Style.centeredText}>Id de Compra: {e.idPayment}</p>
                <p className={Style.centeredText}>Total de la Compra: ${e.amount}</p>
                <p className={Style.centeredText}>Fecha: {e.date.slice(0, 4) + "/" + e.date.slice(5, 7) + "/" + e.date.slice(8, 10)} Hora: {e.date.slice(11, 16)}</p>
                <div>{e.container.map(x => {
                  return (
                    <Link style={{ textDecoration: "none" }} to={`/product/${x._id}`}>
                      <div className={Style.positioning}>
                        <img alt="img" className={Style.Pimg} src={x.image[0]?.url} />
                        <p>{x.name}</p>
                        <p>${x.price}</p>
                      </div>
                    </Link>
                  )
                })}</div>
              </div>
            )
          })}
      </div>
    </div>
  );
}