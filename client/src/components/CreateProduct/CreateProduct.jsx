import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postProduct, getProducts } from "../../redux/actions";
import Style from "./CreateProduct.module.css"
import { State } from "@splidejs/splide";

export default function CreateProduct() {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name: "",
        price: "",
        stock: "",
        image: "",
        mainImage: "",
        secondaryImage: "",
        category: "",
        brands: "",
        description: "",
        views: "",
        rating: "",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        const images = []
        data.append("image", input.mainImage)
        for(let index=0;index<input.secondaryImage.length;index ++){
            data.append("image",input.secondaryImage[index]);
          }
        console.log(input.secondaryImage)
        data.append("name", input.name)
        data.append("price", input.price)
        data.append("stock", input.stock)
        data.append("category", input.category)
        data.append("brands", input.brands)
        data.append("description", input.description)
        dispatch(postProduct(data))
        setInput({
            name: "",
            price: "",
            stock: "",
            image: "",
            category: "",
            brands: "",
            description: "",
        })
        dispatch(getProducts())
    }

    const validate = (input) => {
        let errors = {}
        if(!input.name) {
            errors.name = "El producto no tiene nombre"
        }
        if(!input.price) {
            errors.price = "El producto no tiene precio"
        }
        if(!input.stock) {
            errors.stock = "No se puede publicar un producto sin Stock"
        }
        if(!input.image) {
            errors.image = "Se requiere una imagen"
        }
        if(input.category) {
            errors.category = "El producto no pertenece a ninguna categoria"
        }
        if(!input.brands) {
            errors.brands = "El producto debe tener marca"
        }
        if(!input.description) {
            errors.description = "Agrega una descripción para el producto"
        }
        return errors
    }

  return (
    <div>
        <div className={Style.formPositioning}>
            {/* <label className={Style.label}>Nombre:</label> */}
            <input className="input-form" type="text" value={input.name} name="name" placeholder="Nombre del producto" onChange={(e) => handleChange(e)}></input>
            {
                errors.name && (
                    <p>{errors.name}</p>
                )
            }
            {/* <label>Precio:</label> */}
            <input className="input-form" type="number" value={input.price} name="price" placeholder="Precio" onChange={(e) => handleChange(e)}></input>
            {/* <label>Stock:</label> */}
            <input className="input-form" type="number" value={input.stock} name="stock" placeholder="Stock" onChange={(e) => handleChange(e)}></input>
            <label className={Style.label}>Imagen Principal:</label>
            <input  type="file" name="mainImage" onChange={(e) => setInput({...input, mainImage: e.target.files[0]})}></input>
            <label className={Style.label}>Imagenes Secundarias:</label>
            <input type="file" multiple name="secondaryImage" onChange={(e) => {setInput({...input, secondaryImage: e.target.files}); console.log(e.target.files[0])}}></input>
            {/* <label>Categoria:</label> */}
            <input className="input-form" type="text" value={input.category} name="category" placeholder="Categoria" onChange={(e) => handleChange(e)}></input>
            {/* <label>Marca:</label> */}
            <input className="input-form" type="text" value={input.brands} name="brands" placeholder="Marca" onChange={(e) => handleChange(e)}></input>
            {/* <label>Descripción:</label> */}
            <textarea rows="20" type="text" value={input.description} name="description" aria-multiline="true" placeholder="Añade una descripción" onChange={(e) => handleChange(e)}></textarea>
            {
                !input.name || !input.price || !input.stock || !input.mainImage || !input.category || !input.brands || !input.description 
                ?           
                <button className="button" onClick={() => alert("Debes completar todos los campos")}>Añadir producto</button>
                :
                <button className="button" onClick={(e) => handleSubmit(e)}>Añadir producto</button>
            }
        </div>
    </div>
  )
}
