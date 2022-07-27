import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, viewsUpdate, deleteProduct, clearPage, editProduct } from "../../../redux/actions";
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


  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => { dispatch(clearPage()) }
  }, [dispatch, id]);

  setTimeout(() => {
    setEdit({
      price: product.price,
      stock: product.stock,
      description: product.description
    })
  }, 0);


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
    navigate(-1)
  }


  return (
    <div>
      {product && (
        <div>
          <div className={Style.container}>
            <img src={product.image && product.image[0].url} alt="img" />
            <div className={Style.namePositioning}>
              <h1>{product.name}</h1>
              <br />
              <h1>Precio: ${product.price}</h1>
              <br />
              <h1>Stock: {product.stock}</h1>
              <br />
            </div>
            <div className={Style.inputsAdminPositioning}>
              <button>Guardar Cambios</button>
              <input className="inputPrice" placeholder="Modificar precio" value={edit.price} type="number"
                onChange={(e) => handleChange(e)} ></input>
              <input className="inputPrice" placeholder="Modificar stock" value={edit.stock} type="number"
                onChange={(e) => handleChange(e)} ></input>
            </div>
          </div>
          <div className={Style.lowerPositioning}>
            <div className={Style.descriptionPositioning}>
              <h1 className={Style.descriptionTitle} >Descripción</h1>
              <div className={Style.descriptionBody} >{product.description}</div>
            </div>
            <div className={Style.textarea}>
              <textarea rows="20" type="text" value={edit.description} style={{ resize: "none", width: "45vw" }} aria-multiline="true"
                placeholder="Modifique la descripción" onChange={(e) => handleChange(e)}></textarea>
            </div>
          </div>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
      )}
    </div>
  );
}