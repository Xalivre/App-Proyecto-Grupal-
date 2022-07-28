import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Style from "./BrandsComponent.module.css"


export default function CategoriesBar(props) {

    const brands = useSelector((state) => state.brands)

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
