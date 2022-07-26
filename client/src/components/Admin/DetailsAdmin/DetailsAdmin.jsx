import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, viewsUpdate, deleteProduct, clearPage, editProduct } from "../../../redux/actions";
import Style from "./DetailsAdmin.module.css"

export default function DetailsAdmin(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.details);
  
  const [edit, setEdit] = useState({
    price: "",
    stock: "",
    description: "",
  })
  
  
  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => { dispatch(clearPage()) }
  }, [dispatch, id]);
  
  
  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editProduct(edit))
    alert("Producto modificado correctamente")
    setEdit({
      price: product.price,
      stock: product.stock,
      description: "",
    })
  }


  return (
    <div>
      {product && (
        <div>
          <div className={Style.container}>
            <img src={product.image && product.image[0].url} alt="img" />
            <div className={Style.namePositioning}>
              <h1>{product.name}</h1>
              <div className={Style.pricePositioning}>
                <h1>Precio: ${product.price}</h1>
                <p className={Style.space} >ladislaocomegatoesu</p>
                <input className="inputPrice" placeholder="Modificar precio" value={edit.price} type="number"
                  onChange={(e) => handleChange(e)} ></input>
              </div>
              <div className={Style.pricePositioning}>
                <h1>Stock: {product.stock}</h1>
                <p className={Style.space} >ladislaocomegatoesuawdopdwaaa</p>
                <input className="inputPrice" placeholder="Modificar stock" value={edit.stock} type="number"
                  onChange={(e) => handleChange(e)} ></input>
              </div>
            </div>
          </div>
          <div>
            <h1>Caracteristicas</h1>
            <div>{product.description}</div>
            {/* <textarea rows="20" type="text" value={edit.description} style={{ resize: "none" }} aria-multiline="true"
              placeholder="Modifique la descripción" onChange={(e) => handleChange(e)}></textarea> */}
          </div>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
      )}
    </div>
  );
}