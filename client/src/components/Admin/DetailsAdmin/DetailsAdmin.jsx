import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearPage, editProduct } from "../../../redux/actions";
import Style from "./DetailsAdmin.module.css"

export default function DetailsAdmin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => state.details);

  const [edit, setEdit] = useState({
    price: "",
    stock: "",
    description: "",
  })

  const [showInputs, setShowInputs] = useState("")

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => { dispatch(clearPage()) }
  }, [dispatch, id]);

  /* useEffect(() => {
    setEdit({
      price: product.price,
      stock: product.stock,
      description: product.description
    })
  }, [product]) */

  const handleInputState = (e) => {
    e.preventDefault()
    dispatch(setShowInputs(e.target.value))
  }

  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!edit.price) {
      edit.price = product.price
    }
    if (!edit.stock) {
      edit.stock = product.stock
    } if (!edit.description) {
      edit.description = product.description
    }
    dispatch(editProduct(edit, id))
    console.log(edit)
    alert("Producto modificado correctamente")
    navigate(-1)
  }


  return (
    <div>
      {product && (
        <div>
          <br />
          <div className={Style.container}>
            <img src={product.image && product.image[0].url} alt="img" />
            <div className={Style.namePositioning}>
              <h1>{product.name}</h1>
              <br />
              <h1>Precio: ${product.price} <button onClick={(e) => handleInputState(e)}
                value={"price"}>EDIT</button></h1>
              <br />
              <h1>Stock: {product.stock} <button onClick={(e) => handleInputState(e)}
                value={"stock"}>EDIT</button></h1>
              <br />
            </div>
            <div className={Style.inputsAdminPositioning}>
              <button onClick={(e) => handleSubmit(e)}>Guardar Cambios</button>
              {
                showInputs === "price" &&
              <input className="inputPrice" placeholder="Modificar precio" name="price" value={edit.price} type="number"
                onChange={(e) => handleChange(e)} ></input>
              }
              {
                showInputs === "stock" &&
              <input className="inputPrice" placeholder="Modificar stock" name="stock" value={edit.stock} type="number"
                onChange={(e) => handleChange(e)} ></input>
              }
            </div>
          </div>
          <div className={Style.lowerPositioning}>
            <div className={Style.descriptionPositioning}>
              <h1 className={Style.descriptionTitle} >Descripción <button onClick={(e) => handleInputState(e)}
                value={"description"}>EDIT</button></h1>
              <div className={Style.descriptionBody} >{product.description}</div>
            </div>
            <div className={Style.textarea}>
              {
                showInputs === "description" &&
              <textarea rows="20" type="text" name="description" value={edit.description} style={{ resize: "none", width: "45vw" }} aria-multiline="true"
                placeholder="Modifique la descripción" onChange={(e) => handleChange(e)}></textarea>
              }
            </div>
          </div>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
      )}
    </div>
  );
}