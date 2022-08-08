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
        <img src={decodedToken?.picture || "https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg?ver=6"} alt="Imagen de perfil"/>
          <p> Nombre de Usuario <br/> <span className={Style.span}> {decodedToken?.name || decodedToken?.username}</span></p>
          <p>Correo Electrónico<br/> <span className={Style.span}>{decodedToken?.email}</span></p>
          <p>Dirección de Facturación <br/> <span className={Style.span}>{userExtraInfo?.address ? userExtraInfo.address : 'Sin definir'}</span> </p>
          <p>Codigo postal <br/> <span className={Style.span}>{userExtraInfo?.zipCode ? userExtraInfo.zipCode : 'Sin definir'}</span></p>
          <p>Localidad <br/> <span className={Style.span}>{userExtraInfo?.location ? userExtraInfo.location : 'Sin definir'}</span></p>
          <p>Nro. de Teléfono <br/> <span className={Style.span}>{userExtraInfo?.phoneNumber ? userExtraInfo.phoneNumber : 'Sin definir'}</span></p>
        </div>
      </div>
      <div className={Style.comprasHistory}>
        <p className={Style.titlep}>Historial de Compras</p>
        {Payments.length > 0 ?
          Payments.map((e) => {
            return (
              <div className={Style.container}>
                <p className={Style.centeredText}>Comprobante: {e._id}</p>
                <p className={Style.centeredText}>Fecha: {e.date.slice(0, 4) + "/" + e.date.slice(5, 7) + "/" + e.date.slice(8, 10)} Hora: {e.date.slice(11, 16)}</p>
                <div>{e.container.map(x => {
                  return (
                    <Link style={{ textDecoration: "none" }} to={`/product/${x._id}`}>
                      <div className={Style.positioning}>
                        <p>{x.name}</p>
                        <p>${x.price}</p>
                        <img alt="img" className={Style.Pimg} src={x.image[0]?.url} />
                      </div>
                    </Link>
                  )
                })}</div>
                <p className={Style.centeredText}>Total de la Compra: ${e.amount}</p>
                <hr/><hr/>
              </div>
            )
          }) : <h6>No has hecho compras aún</h6>}
      </div>
    </div>
  );
}