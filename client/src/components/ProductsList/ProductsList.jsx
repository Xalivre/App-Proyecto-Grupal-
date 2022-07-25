import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "./ProductsList.module.css"
import ProductCard from '../ProductCard/ProductCard'
import { sortPrice, getProducts, getCategories, getBrands } from "../../redux/actions"
import AddCartButton from '../AddCartButton/AddCartButton'
import PagingOficial from "../Paging/Paging.tsx"
import DropdownComponent from '../Dropdown/DropdownToggle'
import CategoriesBar from '../BrandsComponent/BrandsComponent'
import DropdownPrecio from '../DropdownPrecio/DropdownPrecio'


export default function ProductsList() {

  const products = useSelector((state) => state.products)
  const filtereds = useSelector((state) => state.filteredProducts)
  const operation = useSelector((state) => state.operation)
  const [page1, setPage1] = useState(0)
  const [page2, setPage2] = useState(12)
  const [brandFilter, setBrandFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const dispatch = useDispatch()


  function handleOrderByPrice(e) {
    e.preventDefault()
    dispatch(sortPrice(e.target.value))
  }

  useEffect(() => {
    if(operation !== "No hacer nada"){
      setBrandFilter("")
    setCategoryFilter("")
    }
    setPage1(0);
    setPage2(12);
  }, [filtereds])


  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories())
    dispatch(getBrands())
  }, [dispatch])

console.log(categoryFilter)
  return (
    <div>
      {/* <div className={Style.imagePositioning}>
        <img className={Style.controllerLeft} src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png" alt="img" />
        <img className={Style.axolot} src="https://puntociego.com.ar/download/multimedia.normal.91084a739de17b1c.67616d696e67207365747570206465736b5f6e6f726d616c2e6a7067.jpg" alt="img" />
        <img className={Style.controllerRight} src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png" alt="img" />
      </div> */}
      <div className={Style.pagingContainer}>
        <div className={Style.pagingOrder}>
          <PagingOficial setPage1={setPage1} setPage2={setPage2} filtereds={Math.ceil(filtereds.length / 12)}/>
          {/* <div>
            {
              filtereds && page1 - 12 >= 0 ? (
                <div onClick={() => { setPage1(page1 - 12); setPage2(page2 - 12) }}>
                  prev
                </div>
              )
                :
                (
                  <div>
                    prev
                  </div>
                )
            }
          </div>
          <div>
            {
              page1 >= 36 && <p onClick={() => { setPage1(0); setPage2(12) }}>1...</p>
            }
            {
              filtereds && Array.isArray(filtereds) && Array.from({ length: Math.ceil(filtereds.length / 12) }, (v, i) => i + 1).slice(
                (page1 / 12 - 2) >= 0 ? (page1 / 12 - 2) : 0, (page1 / 12 - 2) >= 0 ? (page2 / 12 + 2) : (page2 / 12 + 4)
              ).map((e, i) => <p className={(page2 / 12) === e?Style.pagingHighlight : Style.normalHighlight} onClick={() => { setPage1((e - 1) * 12); setPage2((e) * 12) }}>{e}</p>)
            }
            {
              page2 + 24 < filtereds.length && <p onClick={() => {
                setPage1((Math.ceil(filtereds.length / 12) - 1) * 12);
                setPage2(Math.ceil(filtereds.length / 12) * 12)
              }}>...{Math.ceil(filtereds.length / 12)}</p>
            }
          </div>
          <div>
            {
              filtereds && page2 + 1 <= filtereds.length ? (
                <div onClick={() => { setPage1(page1 + 12); setPage2(page2 + 12) }}>
                  next
                </div>
              )
                :
                (
                  <div>
                    next
                  </div>
                )
            }
          </div> */}
      {/*     <select id="orderByPrice" onChange={(e) => handleOrderByPrice(e)}>
            <option value="Ascending">Menor precio</option>
            <option value="Descending">Mayor precio</option>
          </select> */}
          <DropdownPrecio></DropdownPrecio>
        </div>
      </div>
      <div className={Style.container}>
        <div className={Style.categoriesBar}>
          <DropdownComponent products={filtereds.length > 0 && filtereds.map((e) => e.category)} setCategoryFilter={setCategoryFilter} setBrandFilter={setBrandFilter}/>
          <CategoriesBar products={filtereds.length > 0 && filtereds.filter((x) => categoryFilter? x.category === categoryFilter : x.category !== categoryFilter).map((e) => e.brands)} setBrandFilter={setBrandFilter}/> 
        </div>
        <div className={Style.cardsBar}>
          <div className={Style.cardsContainer}>
            {
              operation !== "Error SearchBar" && filtereds.length > 0 ? filtereds.filter((x) => categoryFilter? x.category === categoryFilter : x.category !== categoryFilter)
              .filter((b) => brandFilter? b.brands === brandFilter : b.brands !== brandFilter).slice(page1, page2).map((e) => {
                return (
                  <div key={e._id} >
                    <Link to={"/product/" + e._id}>
                      <ProductCard
                        name={e.name}
                        image={e.image[0]?.url}
                        price={e.price}
                        id={e._id}
                        key={e._id} />
                    </Link>
                  </div>
                )
              })
              :
              <div>BUSCASTE MAL VIEJO</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
