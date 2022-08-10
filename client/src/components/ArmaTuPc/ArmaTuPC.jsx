import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { addToCart, clearPage, getProducts, modifyCart } from '../../redux/actions'
import ProductCardPC from '../ProductCardPC/ProductCardPC'
import Style from "./ArmaTuPC.module.css"
import { useJwt } from "react-jwt"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function ArmaTuPC() {

  const { decodedToken } = useJwt(localStorage.getItem('usuario'));

  let autho = decodedToken?.role;

  const f = localStorage.getItem('Carrito')
    ? JSON.parse(localStorage.getItem('Carrito'))
    : [];

  const refresh = (f) => {
    const w = f.filter((e) => e?.stock > 0);
    localStorage.setItem('Carrito', JSON.stringify(w));
    dispatch(modifyCart(w));
  };

  useEffect(() => {
    refresh(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productSwitcher = useSelector((state) => state.products)
  const builder = useSelector((state) => state.builder)
  const karting = useSelector((state) => state.cart)

  const [showing, setShowing] = useState("")

  useEffect(() => {
    dispatch(getProducts())
    setShowing("Procesadores")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cartStorage = async (id) => {
    if (autho === 'admin' || autho === 'owner') {
      return alert('borrenme algun dia');
    }
    let json = await axios.get('http://localhost:3000/product/' + id);
    const a = localStorage.getItem('Carrito')
      ? JSON.parse(localStorage.getItem('Carrito'))
      : [];
    a.push(json.data);
    localStorage.setItem('Carrito', JSON.stringify(a));
  };

  const finishPurchase = () => {
    let addeds = karting.length > 0 ? builder.filter(e => !karting.map(x => x._id).includes(e._id) && e) : builder;
    addeds.map(x => dispatch(addToCart(x._id)) && cartStorage(x._id)) ;
    dispatch(clearPage())
    navigate("/paymentMethod")
  }




  return (
    <div>
      {showing !== "Finished" ? <div>
        <h1>Elige tus componentes...</h1>
        <h1>{showing}</h1>
        {
          productSwitcher && productSwitcher.map(e => e.category === showing && <div> <ProductCardPC setShowing={setShowing} showing={showing}
            name={e.name}
            image={e.image[0]?.url}
            price={e.price}
            id={e._id}
            key={e._id}
            stock={e.stock} /></div>)
        }</div>
        :
        <div>
          {
            builder.map(e => {
              return (
                <div>
                  <div className={Style.list}>
                    <div className={Style.order}>
                      <img src={e.image[0].url} />
                      <h1>{e.name}</h1>
                      <h1>${e.price}</h1>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <button className='button' onClick={() => { finishPurchase()}}>
            Realizar pedido
          </button>
        </div>}
    </div>
  )
}