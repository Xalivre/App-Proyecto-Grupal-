import React from 'react'
import { useSelector} from "react-redux";
import RemoveWishButton from './RemoveWishButton/RemoveWishButton';
import AddCartButton from '../AddCartButton/AddCartButton';
import s from "./WishList.module.css";

function WishList() {
  const wishList = useSelector((state) => state.wishList)

  return (
    <div className={s.container} >
        <h1>Lista de Deseados</h1>
        {wishList.length > 0 ? wishList.map((p)=>(
        <div>
          <div key={p._id} className={s.card}>
                <RemoveWishButton id={p._id}/>
                <p>{p.name}</p>
                <p>{p.price}</p>
                <p>{p.description}</p>
                <img src={p.image[0].url} />
                <AddCartButton id={p._id}/>
            </div>
        </div>
        ))
        : <div>Aun no tienes productos en la Lista!</div>}
    </div>
  )
}

export default WishList