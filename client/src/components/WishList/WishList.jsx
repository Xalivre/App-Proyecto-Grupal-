import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import RemoveWishButton from './RemoveWishButton/RemoveWishButton';
import AddCartButton from '../AddCartButton/AddCartButton';
import { Link } from 'react-router-dom';
import s from "./WishList.module.css";
import { Style } from '@mui/icons-material';
import { getUserById } from '../../redux/actions';
import {useJwt} from "react-jwt"

function WishList() {

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let idUser = decodedToken?._id;

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    idUser && dispatch(getUserById(idUser))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idUser, refresh])

useEffect(() => {
  console.log(userDetails)
}, [userDetails])



  return (
    <div className={s.container} >
      <h1 style={{ display: "flex", alignSelf: "center", fontWeight: 700 }} >Lista de Deseados</h1>
      <div>
        {userDetails.wishList?.length > 0 ?
          <div className={s.contains}>
           {userDetails.wishList?.map((p) => (
            <Link to={'/product/' + p._id}>
            <div key={p._id} className={s.card}>
              <div className={s.btnContainer} >
                <p style={{ color: "#156dbfb7", textAlign: "left" }} >{p.name}</p>
                <RemoveWishButton className={Style.button} id={p._id} setRefresh={setRefresh} refresh={refresh}/>
              </div>
              <p style={{ width: "100%", textAlign: "left" }}>Precio: ${p.price}</p>
              <img alt="img" className={s.img} src={p.image[0].url} />
              <AddCartButton id={p._id} stock={p.stock} setRefresh={setRefresh} refresh={refresh}/>
            </div>
            </Link>
            ))}
          </div>
          : <h3 style={{ width: "100%", textAlign: "center" }}>Aun no tienes productos en la Lista!</h3>}
      </div>
    </div>
  )
}

export default WishList