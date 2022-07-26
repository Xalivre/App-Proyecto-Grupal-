import React from 'react'
import PaymentCard from '../Stripe/Stripe'

export default function ArmaTuPC() {
  return (
    <div style={{justifyContent: "center", display: "flex"}}>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SITIO-EN-CONSTRUCCION.jpg/1200px-SITIO-EN-CONSTRUCCION.jpg" alt="not found"></img> */}
        <PaymentCard/>
    </div>
  )
}