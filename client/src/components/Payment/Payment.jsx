import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect} from 'react'
import Style from "./Payment.module.css";
import axios from "axios";
import { useJwt } from "react-jwt";
import { Link, useNavigate } from "react-router-dom";
import { getUserPayments, getUsers } from "../../redux/actions";
import swal from "sweetalert"

const stripePromise = loadStripe(
  "pk_test_51LPtrNLlcvSwUKGvyubeafRmZUaNcn4r13BgxwBAO14mkc6lTj07peI4Grt3jfVc0KEuEzT4MMxJwn2dCkaCab4e00DyrfqFX3"
);

const CheckoutForm = ({ cart, amount, emailUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  

  const dispatch = useDispatch();
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let addressValidator = /[a-zA-Z0-9]+\s\d+/gi


  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let email = decodedToken?.email;

 
  
  useEffect(() => {
    email && email.match(pattern) && dispatch(getUserPayments(email));
  }, [decodedToken]);

  useEffect(()=> {
    dispatch(getUsers())
  }, [])
  const users = useSelector((state)=> state.users)
  const userExtraInfo = users.find(e => e.email === email)

  const [info, setInfo] = useState({
    name: '',
    lastname: '',
    email: '',
    address: '',
    zipCode: '',
    location: '',
    phoneNumber: '',
  })

  useEffect(() => {
    setInfo({
      name: '',
      lastname: '',
      email: userExtraInfo ? userExtraInfo.email  : '',
      address: (userExtraInfo && userExtraInfo.address !== 'Sin definir') ? userExtraInfo.address : '',
      zipCode: (userExtraInfo && userExtraInfo.zipCode !== 'Sin definir') ? userExtraInfo.zipCode : '',
      location: (userExtraInfo && userExtraInfo.location !== 'Sin definir') ? userExtraInfo.location : '',
      phoneNumber: (userExtraInfo && userExtraInfo.phoneNumber !== 'Sin definir') ? userExtraInfo.phoneNumber : '',
    })
  },[userExtraInfo])

  const validate = (input) => {
   
    let errors = {}
    let nameColor = document.getElementById('nameColor')
    let lastnameColor = document.getElementById('lastnameColor')
    let emailColor = document.getElementById('emailColor')
    let addressColor = document.getElementById('addressColor')
    let zipCodeColor = document.getElementById('zipCodeColor')
    let locationColor = document.getElementById('locationColor')
    let phoneNumberColor = document.getElementById('phoneNumberColor')
 

    if(!input.name.length > 0){
      errors.name = 'Introducir un nombre'
      nameColor.style.color = 'red'
    } else {
      nameColor.style.color = 'green'
    }
    if(!input.lastname.length > 0){
      errors.lastname = 'Introducir un apellido'
      lastnameColor.style.color = 'red'
    } else {
      lastnameColor.style.color = 'green'
    } 
    if(!input.email.match(pattern)){
      errors.email = 'Introducir un email válido'
      emailColor.style.color = 'red'
    } else {
      emailColor.style.color = 'green'
    }
    if(!input.address.match(addressValidator)){
      errors.address = 'Introducir una dirección válida'
      addressColor.style.color = 'red'
    } else {
      addressColor.style.color = 'green'
    }
    if(!input.zipCode){
      errors.zipCode = 'Introducir un código postal válido'
      zipCodeColor.style.color = 'red'
    } else {
      zipCodeColor.style.color = 'green'
    }
    if(!input.location.length > 0){
      errors.location = 'Introducir una localidad válida'
      locationColor.style.color = 'red'
    } else {
      locationColor.style.color = 'green'
    }
    if(!input.phoneNumber || input.phoneNumber.length < 8){
      errors.phoneNumber = 'Introducir un número de teléfono'
      phoneNumberColor.style.color = 'red'
    } else {
      phoneNumberColor.style.color = 'green'
    }
    return errors
  } 

  const handleChange = (e) => {
    e.preventDefault()
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...info,
        [e.target.name]: e.target.value
      })
    )

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true)

    if (!error) {
      const { id } = paymentMethod;
      try {
        const {data} = await axios.post("http://localhost:3000/api/checkout", {
        id,
        amount,
        cart,
        email: emailUser
      });
      console.log(data)
      if(data.message === "Successful payment"){
        localStorage.removeItem("Carrito")
        swal("Felicitaciones!","Operación completada exitosamente","success")
        navigate('/')
      }

      await axios.get("http://localhost:3000/api/checkoutEmail", {
        email: emailUser
      })
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }

  };
  return (
    <div>
      <Link to="/paymentMethod"><button>VOLVER</button></Link>
      <br /><br /><br />
      <form onSubmit={handleSubmit} className={Style.formulario}>
        <center><h1>Realizar pago</h1></center>
        <div className={Style.contenedor}>
          <label>Nombre:</label>
          <div className={Style.inputcontenedor}>
            <input type="text" name='name' value={info.name} required onChange={handleChange} />
            {
              <ul>
                <li id='nameColor'>
                  Introducir un nombre
                </li>
              </ul>
            }
          </div>
          <label>Apellidos:</label>
          <div className={Style.inputcontenedor}>
            <input type="text" name='lastname' value={info.lastname} required onChange={handleChange} />
            {
              <ul>
                <li id='lastnameColor'>
                  Introducir un apellido
                </li>
              </ul>
            }
          </div>
          <label>Email:</label>
          <div className={Style.inputcontenedor}>
            <input type="text" name='email'required value={info.email} onChange={handleChange}/>
            {
              <ul>
                <li id='emailColor'>
                  Introducir un email válido
                </li>
              </ul>
            }
          </div>
          <label>Localidad:</label>
          <div className={Style.inputcontenedor}>
            <input type="text" name='location' value={info.location} required onChange={handleChange}/>
            {
              <ul>
                <li id='locationColor'>
                  Introducir una localidad
                </li>
              </ul>
            }
          </div>
          <label>Dirección:</label>
          <div className={Style.inputcontenedor}>
            <input type="text" name='address' value={info.address} required onChange={handleChange}/>
            {
              <ul>
                <li id='addressColor'>
                  Introducir una dirección válida
                </li>
              </ul>
            }
          </div>
          <label>Código Postal:</label>
          <div className={Style.inputcontenedor}>
            <input type="number" name='zipCode' value={info.zipCode} required onChange={handleChange}/>
            {
              <ul>
                <li id='zipCodeColor'>
                  Introducir código postal
                </li>
              </ul>
            }
          </div>
          <label>Nro. de Teléfono:</label>
          <div className={Style.inputcontenedor}>
            <input type="number" name='phoneNumber' value={info.phoneNumber} required onChange={handleChange}/>
            {
              <ul>
                <li id='phoneNumberColor'>
                  Introducir un número de télefono válido
                </li>
              </ul>
            }
          </div>
          <label>Tarjeta de Crédito/Débito:</label>
          <div className={Style.inputcontenedor}>
            <CardElement className={Style.inputCard} />
          </div>
          <br />
        </div>
        { !errors.name && !errors.lastname && !errors.email && !errors.address && !errors.zipCode && !errors.location && !errors.phoneNumber ? 

        <button disabled={!stripe} className={Style.button}>{loading ? (
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : ("Buy")}
        </button>
        : <div> boton trucho </div>

        }

      </form>
      <br /><br /><br />
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

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));
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