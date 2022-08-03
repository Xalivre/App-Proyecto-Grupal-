import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory, clearPage, changeState } from "../../../redux/actions";
import styles from "./PaymentHistory.module.css"

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
  

  const handleState =  async (e) => {
    e.preventDefault()
    const objHistory = {
      paymentId:  e.target.value,
      userId: id,
      state: 'despachado'
    }
    await dispatch(changeState(objHistory))
    await dispatch(getPaymentHistory(id))
  }

  return (
    <div>
      <br/>
      <Link to="/Dashboard">
        <button>Volver</button>
      </Link>
      {!loading ? (
        paymentDetails?.map((e) => {
          return (
            <div>
              
              <h1>Compra N°{counter++}</h1>
              <div>
                <h2>Productos comprados: </h2>
                {e.container.map((f) => {
                  return (
                    <div>
                      <h5>{f.name}</h5>
                      <h5>${f.price}</h5>
                    </div>
                  );
                })}
              </div>
              <h4>Monto Total:</h4> <h6>{e.amount}</h6>
              <h4>Fecha:</h4> <h6>{e.date.slice(0, 10)}</h6>
              <h5>Estado de envio:</h5>{
              e.state === 'despachado' ? <h6>✅ {e.state }</h6> : <h6>⌛ {e.state }</h6>  } 

              { 
                e.state === 'pendiente' ?
                <button value={e._id} onClick={(e) => handleState(e)}>Despachar</button> : <button className={styles.transparent} disabled value={e._id} onClick={(e) => handleState(e)}>Cancelar</button>
      
                }
              <br/>
              <br/>

            </div>
            
          );
        })
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
}
