import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, sortPrice, sortRating } from "../../redux/actions"
import ProductCard from '../ProductCard/ProductCard'


function Home() {



  return (
    <div>
      <h1>SOY EL HOME</h1>
      <div>
        {
          products?.filter((e) => {

            return(
              <div key = { e.id } >
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