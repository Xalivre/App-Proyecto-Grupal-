import React from 'react'
import {Link} from "react-router-dom";

export default function PaymentMethod() {

  return (
    <div>
      <Link to="/paymentMethod/Checkout"><button>Stripe</button></Link>
      <p> o </p>
      <Link to="#"><button>Mercadopago</button></Link>
    </div>
  )
}
