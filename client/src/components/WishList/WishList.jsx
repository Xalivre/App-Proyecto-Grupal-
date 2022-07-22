import React from 'react'
import { useSelector} from "react-redux";
import RemoveWishButton from './RemoveWishButton/RemoveWishButton';
import AddCartButton from '../AddCartButton/AddCartButton';

function WishList() {
  const wishList = useSelector((state) => state.wishList)

  return (
    <div>
        <h1>Lista de Deseados</h1>
        {wishList.length > 0 ? wishList.map((p)=>(
            <div key={p._id} >
                <RemoveWishButton id={p._id}/>
                <p>{p.name}</p>
                <p>{p.price}</p>
                <p>{p.description}</p>
                <img src={p.image} />
                <AddCartButton id={p._id}/>
            </div>
        ))
        : <div>Aun no tienes productos en la Lista!</div>}
    </div>
  )
}

export default WishList