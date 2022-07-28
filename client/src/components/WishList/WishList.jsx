import React from 'react'
import { useSelector} from "react-redux";
import RemoveWishButton from './RemoveWishButton/RemoveWishButton';
import AddCartButton from '../AddCartButton/AddCartButton';
import s from "./WishList.module.css";

function WishList() {

  const wishList = useSelector((state) => state.wishList)



  return (
    <div className={s.container} >
        <h1 style={{display:"flex",alignSelf:"center",fontWeight:700}} >Lista de Deseados</h1>
        <div className={s.contains}>
        {wishList.length > 0 ? wishList.map((p)=>(
        <div>
          <div key={p._id} className={s.card}>
                <div className={s.btnContainer} ><RemoveWishButton id={p._id}/></div>
                <h3 style={{color:"#156dbfb7"}} >{p.name}</h3>
                <p>Precio: ${p.price}</p>
                <img className={s.img} src={p.image[0].url} />
                <AddCartButton id={p._id}/>
            </div>
        </div>
        ))
        : <h3>Aun no tienes productos en la Lista!</h3>}
        </div>
    </div>
  )
}

export default WishList