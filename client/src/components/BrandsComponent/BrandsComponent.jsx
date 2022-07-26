import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/actions"
import Style from "./BrandsComponent.module.css"


export default function CategoriesBar(props) {

    const brands = useSelector((state) => state.brands)
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const openDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className={Style.container}>
            <div className={Style.list}>
            <br /> 
                <div className={Style.title}>
                    Marcas
                </div>
                <br /> 
                <div className={Style.info}>
                    {
                        props.products && brands?.filter((j) => props.products.includes(j)).map((e) => <div className={Style.brands} id={e} onClick={(e) => props.setBrandFilter(e.target.id)}
                        >🔹 {e}
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
