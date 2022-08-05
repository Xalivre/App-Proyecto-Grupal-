import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearPage, getUsers } from "../../redux/actions";
import AddCartButton from "../AddCartButton/AddCartButton";
import AddWishButton from "../WishList/AddWIshButton/AddWishButton";
import Style from "./Details.module.css"
import loader from "../../img/loader.gif"
import Reviews from "./Reviews/Reviews";
import { useJwt } from "react-jwt";


export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.details);

  const { decodedToken } = useJwt(localStorage.getItem("usuario"))
  let userIdFromToken = decodedToken?._id
  let userInfoGoogle = decodedToken?.email
  console.log(decodedToken)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const users = useSelector((state) => state.users)
  const user = users.find(e => e._id === userIdFromToken)
  const userGoogle = users.find(e => e.email === userInfoGoogle)

  const verifyPurchase = user?.paymentHistory.some(e => e.container.some(x => x._id === id))

  const verifyPurchaseGoogle = userGoogle?.paymentHistory.some(e => e.container.some(x => x._id === id))

  console.log(verifyPurchaseGoogle)


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(product)
    product.name && setLoading(false)
  }, [product])

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => { dispatch(clearPage()) }
  }, [dispatch, id]);

  return (
    <div className={Style.containerAll}>
      {!loading ?
        <div className={Style.containerBlocks}>
          <div className={Style.container}>
            <div className={Style.titleContainer}>
              <div className={Style.namePositioning}>
                <h1 className={Style.brandName}>Game<span className={Style.hubspan}>Hub</span></h1>
                <h1 className={Style.productName}>{product.name}</h1>
                <h1 className={Style.price}>${product.price}</h1>
              </div>
            </div>

            <div className={Style.imageContainer}>
              <img src={product.image && product.image[0].url} alt="img" />  
            </div>

            <div className={Style.descriptionContainer}>
              {/* <h1>Caracteristicas</h1> */}
              <p className={Style.description}>{product.description}</p>
              <p>Stock: <span className={Style.stock}>{product.stock}</span></p>
              <AddCartButton id={product._id} />
              <AddWishButton id={product._id} />
            </div>
          </div>
          {
           ( verifyPurchase || verifyPurchaseGoogle) &&
            <Reviews id={id} />
          }
          <div className={Style.reseñas}>
            <h2>Últimas reseñas</h2>
            {
              product.comments.length > 0 ? product.comments.map(e => {
                return (
                  <div className={Style.reseñasContainer}>
                    <div>Usuario: {e.username && e.username}</div>
                    <div>{e.comment && e.comment}</div>
                    <div>{e.commentRating && e.commentRating}</div>
                  </div>
                )
              })
              :
              <h6>Este producto no tiene comentarios, recuerda dejarnos el tuyo cuando hagas una compra</h6>
            }
          </div>
        </div> : <div className={Style.loader}><img className={Style.gif} src={loader} alt='loading'></img></div>
      }
    </div>
  );
}
