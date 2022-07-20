import React from 'react'
import { addToCart } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"

export default function ProductCard({id, name, price, image}) {

  const dispatch = useDispatch()

  return (
    <div>
        <div>{name}</div>
        <img src={image}/>
        <div>{price}</div>
        <button onClick={() => dispatch(addToCart(id))}></button>
    </div>
  )
}
