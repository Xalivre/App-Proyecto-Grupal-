import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, sortPrice, sortRating, filterProducts } from "../../redux/actions"
import ProductCard from '../ProductCard/ProductCard'
import Style from "./Home.module.css"


function Home() {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const carousel = useSelector((state) => state.carousel)


  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterProducts())
  }, [dispatch])


  return (
    <div>
      <div>
        <img className={Style.axolot} src="https://www.lavanguardia.com/uploads/2022/01/03/61d23df735196.jpeg" />
      </div>
      <div className={Style.title}>MOUSES</div>
      <div className={Style.carousel}>
        {
          carousel?.map((e) => {

            return (
              <div key={e.id} >
                <ProductCard
                  name={e.name}
                  image={e.image}
                  price={e.price}
                  key={e.id} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;