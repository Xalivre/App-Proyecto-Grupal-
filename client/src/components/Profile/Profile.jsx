import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { getUserPayments, getUsers } from "../../redux/actions";
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

  useEffect(()=> {
    dispatch(getUsers())
  }, [dispatch])
  
  const Payments = useSelector((state) => state.userPayments);
  const users = useSelector((state)=> state.users)
  const userExtraInfo = users.find(e => e.email === email)
  



  return (
    <div>
      <div className={Style.title}>
        <br />
        Información de la cuenta
        <div className={Style.profileInfo}>
          <br /><br />
          <div>Nombre de Usuario: {decodedToken?.username}</div>
          <div>Correo Electrónico: {decodedToken?.email}</div>
          <div>Dirección de Facturación: {userExtraInfo?.address ? userExtraInfo.address : 'Sin definir'} </div>
          <div>Codigo postal: {userExtraInfo?.zipCode ? userExtraInfo.zipCode : 'Sin definir'}</div>
          <div>Localidad: {userExtraInfo?.location ? userExtraInfo.location : 'Sin definir'}</div>
          <div>Nro. de Teléfono: </div>
          <br /><br />
        </div>
        Historial de Compras
        <br /><br />
      </div>
      <div>
        {Payments &&
          Payments.map((e) => {
            return (
              <div className={Style.container}>
                <div className={Style.centeredText}>Id de Compra: {e.idPayment}</div>
                <br/>
                <div className={Style.centeredText}>Total de la Compra: ${e.amount}</div>
                <br/>
                <div className={Style.centeredText}>Fecha: {e.date.slice(0, 4) + "/" + e.date.slice(5, 7) + "/" + e.date.slice(8, 10)} Hora: {e.date.slice(11, 16)}</div>
                <div>{e.container.map(x => {
                  return (
                    <div className={Style.positioning}>
                      <img className={Style.Pimg} src={x.image[0]?.url} />
                      <div>{x.name}</div>
                      <div>${x.price}</div>
                    </div>
                  )
                })}</div>
                <br/><br/><br/>
              </div>
            )
          })}
      </div>
    </div>
  );
}
