import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loginRefresher, searchName } from "../../redux/actions";
import FavoriteIcon from '@mui/icons-material/Favorite';
/* import AddCircleIcon from '@mui/icons-material/AddCircle'; */
import logo from "../../img/favicon.png";
import CartDrawer from "../Cart/CartDrawer.tsx"
import { useJwt } from "react-jwt";
/* import Profile from "../Profile/Profile"; */
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';


function SearchBar(props) {

  let navigate = useNavigate();
  const dispatch = useDispatch()

  const { decodedToken } = useJwt(localStorage.getItem("usuario"))
  let autho = decodedToken?.role



  const cart = useSelector((state) => state.cart);
  const products = useSelector ((state)=>state.products);
  /* const [cart, setCart] = useState(localStorage.getItem("Carrito")?JSON.parse(localStorage.getItem("Carrito")) : []) */

  /* useEffect(() => {
    if(JSON.parse(localStorage.getItem("Carrito"))){
      setCart(...cartState, JSON.parse(localStorage.getItem("Carrito")))
    }
  }, [cartState]) */
  


  // Vamos a manejar los productos a buscar por estados

  const [searchProduct, setSearchProduct] = useState("");
  const [suggestions, setSuggestions] = useState([])

  function handleSubmit(e) {
    // searchName(searchProduct)
    e.preventDefault();
    if (searchProduct.length > 0 && searchProduct[0] !== " ") {
      autho !== "admin" ? navigate('/products') : navigate("/Dashboard")
      dispatch(searchName(searchProduct));
      setSearchProduct("")
    } else if(searchProduct[0] === " "){
      alert("No se permiten espacios en la primera posición")
    }
  }

  const onChangeHandler = (text)=>{
    let matches=[]
    if (text.length>0) {
      matches = products.filter(p=>{
        const regex= new RegExp(`${text}`,"gi")
        return p.name.match(regex)
      })
    }
    setSuggestions(matches)
    console.log(suggestions.map(s=>s.name));
    
    setSearchProduct(text);

  }

  const onSuggestHandler = (text)=>{
    setSearchProduct(text);
    setSuggestions([]);
  }

  return (
    <div className={styles.containerAll}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="img" />
      </Link>
      <div style={{backgroundcolor:"red"}}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <input
            onChange={(e) => onChangeHandler(e.target.value)}
            value={searchProduct}
            onBlur={()=>{
              setTimeout(()=>{
                setSuggestions([])
                // setSearchProduct("")
              }, 100)
            }}
            // className="col-md-12 input"
            className={`${styles.input} input`}
            placeholder="Buscar un producto.."
            />
          <button className="button">Buscar</button>
        </form>
        <div className={styles.suggestions_container}>
          {suggestions.length>0 && suggestions.map(s=> 
          <div key={s._id} className={styles.suggestions} onClick={()=>onSuggestHandler(s.name)}>
            <img className={styles.suggestion_img} src={s.image[0]?.url} alt="loquequieras" />
            <div>{s.name}</div>
          </div> )
          }
        </div> 
      </div>
      <div className={styles.login}>
        {!localStorage.getItem("usuario") && <><Link to="/register">
          <button className="button" >Registrarse</button>
        </Link> 
          <Link to="/login">
            <button className="button" >Iniciar Sesión</button>
          </Link></>}
          {
            localStorage.getItem("usuario") && (autho === "admin" || autho === "owner") && <Link to="/Dashboard"><button className="button" >Dashboard</button></Link>
          }
          {
            localStorage.getItem("usuario") && <Link to="/" onClick={() => {localStorage.removeItem("usuario"); dispatch(loginRefresher())}}>
          <button className="button" >Cerrar Sesión</button></Link>
          }
        {
          (autho !== "admin" && autho !== "owner") &&
          <div>
            <CartDrawer cart={cart} />
          </div>
        }
        {
          localStorage.getItem("usuario") && autho !== "admin" &&
          <Link to="/wishlist">
          <div>
            <FavoriteIcon />
          </div>
        </Link>}
        {localStorage.getItem("usuario") && autho !== "admin" && <div>
        <Link to= "/MyProfile">
            <div className={styles.profile_img}><AccountCircleSharpIcon/></div>
          </Link>
          </div>}
          {(autho === "admin" || autho === "owner") && <Link to="/Dashboard"><button className="button">Administración</button></Link>}
      </div>
    </div>
  );
}

export default SearchBar;
