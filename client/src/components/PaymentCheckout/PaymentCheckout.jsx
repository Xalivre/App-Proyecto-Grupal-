import React from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Style from "./Payment.module.css";
import axios from "axios";
import { useJwt } from "react-jwt";

const stripePromise = loadStripe(
  "pk_test_51LPtrNLlcvSwUKGvyubeafRmZUaNcn4r13BgxwBAO14mkc6lTj07peI4Grt3jfVc0KEuEzT4MMxJwn2dCkaCab4e00DyrfqFX3"
);

const CheckoutForm = ({ cart, amount, emailUser }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const {data} = await axios.post("http://localhost:3000/api/checkout", {
          id,
          amount,
          cart,
          email: emailUser
        });

        const searchUserForEmail = await axios.get("http://localhost:3000/api/checkoutEmail", {
          email: emailUser
        })

        console.log(data)
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={Style.container}>
      <br />
      <br /> <br />
      <form onSubmit={handleSubmit} className={Style.paymentCard}>
        <CardElement className={Style.inputs} />
        {/* <img AGREGAR IMAGENES DEL CARRITO/> */}
        <br />
        <button disabled={!stripe}> Buy </button>
      </form>
    </div>
  );
};

export default function PaymentCard() {
  const cart = useSelector((state) => state.cart);

  var total = 0;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price;
    }
  }
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("usuario"));
  let emailUser
  if (decodedToken) {
    emailUser = decodedToken.email
  }

  return (
    <Elements stripe={stripePromise} className={Style.inputs}>
      {cart.length > 0 ? (
        <CheckoutForm key={cart.id} cart={cart} amount={total} emailUser={emailUser} />
      ) : (
        <div> Aun no hay productos</div>
      )}
    </Elements>
  );
}