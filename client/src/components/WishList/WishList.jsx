import React from 'react'
import { useSelector } from "react-redux";
import RemoveWishButton from './RemoveWishButton/RemoveWishButton';
import AddCartButton from '../AddCartButton/AddCartButton';
import s from "./WishList.module.css";
import { Style } from '@mui/icons-material';

function WishList() {

  const wishList = useSelector((state) => state.wishList)



  return (
    <div className={s.container} >
      <h1 style={{ display: "flex", alignSelf: "center", fontWeight: 700 }} >Lista de Deseados</h1>
      <div>
        {wishList.length > 0 ?
          <div className={s.contains}>
           {wishList.map((p) => (
            <div key={p._id} className={s.card}>
              <div className={s.btnContainer} >
                <p style={{ color: "#156dbfb7", textAlign: "left" }} >{p.name}</p>
                <RemoveWishButton className={Style.button} id={p._id} />
              </div>
              <p style={{ width: "100%", textAlign: "left" }}>Precio: ${p.price}</p>
              <img alt="img" className={s.img} src={p.image[0].url} />
              <AddCartButton id={p._id} />
            </div>
            ))}
          </div>
          : <h3 style={{ width: "100%", textAlign: "center" }}>Aun no tienes productos en la Lista!</h3>}
      </div>
    </div>
  )
}

export default WishList