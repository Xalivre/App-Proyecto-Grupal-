import React from "react";
// import {useSelector} from "react-redux";
import {loadStripe} from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Style from "./Stripe.module.css"

const stripePromise = loadStripe("pk_test_51LPtrNLlcvSwUKGvyubeafRmZUaNcn4r13BgxwBAO14mkc6lTj07peI4Grt3jfVc0KEuEzT4MMxJwn2dCkaCab4e00DyrfqFX3")



const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),

        });
        if(!error) {
            console.log(paymentMethod)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={Style.paymentCard}>
            <CardElement/>
            {/* <img AGREGAR IMAGENES DEL CARRITO/> */}
            <button> Submit </button>
        </form>
    )
}

export default function PaymentCard () {

    // const allProductsCart = useSelector(state => state.cart);
    // console.log(allProductsCart);

    return (
            <Elements stripe={stripePromise} >

                    <CheckoutForm/>

            </Elements>
    )

}