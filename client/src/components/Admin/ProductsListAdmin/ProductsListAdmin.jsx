import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Style from "./ProductsListAdmin.module.css"
import ProductCardAdmin from '../ProductCardAdmin/ProductCardAdmin'
import {getProducts, getCategories, getBrands, searchName, getTotalPayments } from "../../../redux/actions"
import PagingOficial from "../../Paging/Paging.tsx"
import DropdownComponent from '../../Dropdown/DropdownToggle'
import CategoriesBar from '../../BrandsComponent/BrandsComponent'
import DropdownPrecio from '../../DropdownPrecio/DropdownPrecio'
import loader from '../../../img/loader.gif'


export default function ProductsListAdmin() {

  const filtereds = useSelector((state) => state.filteredProducts)
  const operation = useSelector((state) => state.operation)
  const [page1, setPage1] = useState(0)
  const [page2, setPage2] = useState(18)
  const [brandFilter, setBrandFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (operation !== "No hacer nada") {
      setBrandFilter("")
      setCategoryFilter("")
    }
    setPage1(0);
    setPage2(18);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtereds])


  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories())
    dispatch(getBrands())
    dispatch(getTotalPayments())
    filtereds.length > 0 && setLoading(false)
  }, [dispatch])

  return (
    <div className={Style.containerAll}>
      <div className={Style.pagingContainer}>
        <div className={Style.pagingOrder}>
          <PagingOficial setPage1={setPage1} setPage2={setPage2} filtereds={Math.ceil(filtereds.filter((x) => categoryFilter ? x.category === categoryFilter : x.category !== categoryFilter)
                .filter((b) => brandFilter ? b.brands === brandFilter : b.brands !== brandFilter).length / 18)} />
        </div>
      </div>
      <div className={Style.container}>
        <div className={Style.categoriesBar}>
            <button className="buttonDashboard" onClick={() => {
              setBrandFilter("")
              setCategoryFilter("")
              dispatch(searchName(""))
            }}>Recargar</button>
          <DropdownComponent products={filtereds.length > 0 && filtereds.map((e) => e.category)} setCategoryFilter={setCategoryFilter} setBrandFilter={setBrandFilter} />
          <DropdownPrecio></DropdownPrecio>
          <CategoriesBar products={filtereds.length > 0 && filtereds.filter((x) => categoryFilter ? x.category === categoryFilter : x.category !== categoryFilter).map((e) => e.brands)} setBrandFilter={setBrandFilter} />
        </div>
        <div className={Style.cardsBar}>
          <div className={Style.cardsContainer}>
            {
              operation !== "Error SearchBar" && filtereds.length > 0 ? filtereds.filter((x) => categoryFilter ? x.category === categoryFilter : x.category !== categoryFilter)
                .filter((b) => brandFilter ? b.brands === brandFilter : b.brands !== brandFilter).slice(page1, page2).map((e) => {
                  return (
                    <div key={e._id} >
                      <div>
                        <ProductCardAdmin
                          name={e.name}
                          image={e.image[0]?.url}
                          price={e.price}
                          id={e._id}
                          key={e._id} />
                      </div>
                      <br />
                    </div>
                  )
                })
                :  loading ? <div className={Style.loader}><img className={Style.gif} src={loader} alt="Loading"/></div> :
                <div>Producto inexistente!</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
