import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory, clearPage } from "../../../redux/actions";

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

  return (
    <div>
      {!loading ? (
        paymentDetails?.map((e) => {
          return (
            <div>
              <h1>Compra N°{counter++}</h1>
              <div>
                <h1>Productos comprados: </h1>
                {e.container.map((f) => {
                  return (
                    <div>
                      <h5>{f.name}</h5>
                    </div>
                  );
                })}
              </div>
              <h3>Monto Total: {e.amount}</h3>
              <h3>Fecha: {e.date.slice(0,10)}</h3>
            </div>
          );
        })
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
}
