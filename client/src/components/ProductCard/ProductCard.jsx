import React from 'react'
import { addToCart } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import Style from "./ProductCard.module.css"
import AddCartButton from '../AddCartButton/AddCartButton'

export default function ProductCard({ id, name, price, image }) {

  const dispatch = useDispatch()

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.cardContainer}>
        <div className={Style.name}>
          {
            name.length >= 45 ? <div>{name.slice(0, 45)}...</div>
            :
            <div>
            {name}
            </div>
          }
        </div>
        <img className={Style.image} src={image} />
        <div className={Style.price}>${price}</div>
        <AddCartButton id={id} />
      </div>
    </div>
  )
}
