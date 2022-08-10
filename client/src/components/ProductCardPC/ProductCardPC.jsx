import React, { useEffect } from 'react';
import {
  modifyCart,
  getUserById,
  addToBuilder,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Style from './ProductCardPC.module.css';
import swal from 'sweetalert';
/* import AddCartButton from "../AddCartButton/AddCartButton"; */
import { Link } from 'react-router-dom';
import { useJwt } from 'react-jwt';
/* import WishListButton from "../CardButtons/WishListButton"; */

export default function ProductCardPC({ id, name, price, image, stock, showing, setShowing }) {
  const { decodedToken } = useJwt(localStorage.getItem('usuario'));

  let autho = decodedToken?.role;
  let idUser = decodedToken?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    idUser && dispatch(getUserById(idUser));
  }, [idUser]);

  useEffect(() => {
    idUser && dispatch(getUserById(idUser));
  }, [dispatch]);

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
  return (
    <div className={Style.carouselOrder}>
      <div className={Style.container}>
        <div className={Style.cardContainer}>
          <Link to={'/product/' + id}>
            <img className={Style.image} src={image} alt="img" />
            <div className={Style.text}>
              <div className={Style.name}>
                {name.length >= 45 ? (
                  <div>{name.slice(0, 45)}...</div>
                ) : (
                  <p>{name}</p>
                )}
              </div>
            </div>
            <p className={Style.price}>${price}</p>
          </Link>
        </div>
        <div className={Style.buttonsContainer}>
          {stock > 0 && (
            <button
              onClick={() => {
                autho === 'admin' || autho === 'owner'
                  ? swal(
                      'Error',
                      'Un administrador no puede realizar esta acción',
                      'error'
                    )
                  : 
                  showing === "Procesadores" ? dispatch(addToBuilder(id)) && setShowing("Mothers")
                  :
                  showing === "Mothers" ? dispatch(addToBuilder(id)) && setShowing("Coolers")
                  :
                  showing === "Coolers" ? dispatch(addToBuilder(id)) && setShowing("Memorias RAM")
                  :
                  showing === "Memorias RAM" ? dispatch(addToBuilder(id)) && setShowing("Discos Rígidos")
                  :
                  showing === "Discos Rígidos" ? dispatch(addToBuilder(id)) && setShowing("Discos Sólidos")
                  :
                  showing === "Discos Sólidos" ? dispatch(addToBuilder(id)) && setShowing("Placas de Video")
                  :
                  showing === "Placas de Video" ? dispatch(addToBuilder(id)) && setShowing("Gabinetes")
                  :
                  showing === "Gabinetes" && dispatch(addToBuilder(id)) && setShowing("Finished") 
              }}
              className="button"
            >
              Seleccionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
