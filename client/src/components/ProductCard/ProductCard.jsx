import React from 'react'
import { addToCart } from "../../redux/actions"

export default function ProductCard({id, name, price, image}) {
  return (
    <div>
        <div>{name}</div>
        <img src={image}/>
        <div>{price}</div>
        <button onClick={() => dispatch(addToCart(id))}></button>
    </div>
  )
}
