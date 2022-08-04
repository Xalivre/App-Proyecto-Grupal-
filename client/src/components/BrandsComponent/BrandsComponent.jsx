import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Style from "./BrandsComponent.module.css";

export default function CategoriesBar(props) {
  const brands = useSelector((state) => state.brands);

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Marcas</h1>
      <br />
      <div className={Style.info}>
        {props.products &&
          brands
            ?.filter((j) => props.products.includes(j))
            .map((e) => (
              <li
                className={Style.brands}
                id={e}
                key={e}
                onClick={(e) => props.setBrandFilter(e.target.id)}
              >
                {e}
              </li>
            ))}
      </div>
    </div>
  );
}
