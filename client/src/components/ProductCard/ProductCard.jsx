import React from 'react'
import { addToCart } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import Style from "./ProductCard.module.css"

export default function ProductCard({ id, name, price, image }) {

  const dispatch = useDispatch()

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.cardContainer}>
        <div className={Style.name}>{name}</div>
        <img className={Style.image} src={image} />
        <div className={Style.price}>${price}</div>
      </div>
    </div>
  )
}
