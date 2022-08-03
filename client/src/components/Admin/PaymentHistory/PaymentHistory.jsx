import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory, clearPage, changeState } from "../../../redux/actions";
import styles from "./PaymentHistory.module.css";
import loader from "../../../img/loader.gif"

export default function PaymentHistory(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const paymentDetails = useSelector((state) => state.paymentHistory);



  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentDetails.length > 0 && setLoading(false);
  }, [paymentDetails]);

  useEffect(() => {
    dispatch(getPaymentHistory(id));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch]);

  let counter = 1;
  

  const handleState =  (e) => {
    e.preventDefault()
    const objHistory = {
      paymentId:  e.target.value,
      userId: id,
      state: 'despachado'
    }

    dispatch(changeState(objHistory))
  }

  return (
    <div className={styles.containerAll}>
      <br/>
      <Link to="/Dashboard">
        <button className="btnMod">Volver</button>
      </Link>
      {!loading ? (

        <div className={styles.cardsContainer}>
          {paymentDetails?.map((e) => {
            return (
          
              <div className={styles.cardContainer}>
                <h1 className={styles.order}>Compra N°{counter++}</h1>
                <div>
                  <p className={styles.titleProducts}>Productos comprados: </p>
                  <div className={styles.allinfoContainer}>
                    {e.container.map((f) => {
                      return (
                        <div className={styles.infoContainer}>
                          <p>{f.name}</p>
                          <p className={styles.price}><span className={styles.spanPrice}>$ </span>{f.price}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.totalAmount}>
                  <p className={styles.titlep}>Monto Total:</p>
                  <p className={styles.priceTotal}><span className={styles.spanPrice}>$ </span>{e.amount}</p>
                </div>
                <div className={styles.totalAmount}>
                  <p className={styles.titlep}>Fecha:</p>
                  <p className={styles.priceTotal}>{e.date.slice(0, 10)}</p>
                </div>
                <div className={styles.totalAmount}>
                  <p className={styles.titlep}>Estado de envio:</p>
                  <p className={styles.priceTotal}>{e.state}</p>
                </div>
                {/* <h3>Fecha: {e.date.slice(0, 10)}</h3>
                <h5>Estado de envio: {e.state}</h5> */}
                {
                  e.state === 'pendiente' ?
                  <button style={{marginTop: "1rem"}} className="btnMod" value={e._id} onClick={(e) => handleState(e)}>Despachar</button> : <button className={styles.transparent} disabled value={e._id} onClick={(e) => handleState(e)}>Cancelar</button>
                  }
                <br/>
                <br/>
              </div>
          
            );
          })}
        </div>
      ) : (
        <div className={styles.loaderContainer}><img src={loader} className={styles.loader} alt="loader"/></div>
      )}
    </div>
  );
}
