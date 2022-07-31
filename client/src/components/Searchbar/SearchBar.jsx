import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { searchName } from "../../redux/actions";
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
  /* const [cart, setCart] = useState(localStorage.getItem("Carrito")?JSON.parse(localStorage.getItem("Carrito")) : []) */

  /* useEffect(() => {
    if(JSON.parse(localStorage.getItem("Carrito"))){
      setCart(...cartState, JSON.parse(localStorage.getItem("Carrito")))
    }
  }, [cartState]) */
  


  // Vamos a manejar los productos a buscar por estados

  const [searchProduct, setSearchProduct] = useState("");

  function handleSubmit(e) {
    // searchName(searchProduct)
    e.preventDefault();
    if (searchProduct.length > 0) {
      autho === "user" ? navigate('/products') : navigate("/Dashboard")
      dispatch(searchName(searchProduct));
      setSearchProduct("")
    }
  }

  return (
    <div className={styles.containerAll}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="img" />
      </Link>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input
          onChange={(e) => setSearchProduct(e.target.value)}
          value={searchProduct}
          className={`${styles.input} input`}
          placeholder="Search product"
        />
        <button className="button">Search</button>
      </form>
      <div className={styles.login}>
        {!localStorage.getItem("usuario") && <><Link to="/register">
          <button className="button" >Sign In</button>
        </Link> 
          <Link to="/login">
            <button className="button" >Log in</button>
          </Link></>}
          {
            localStorage.getItem("usuario") && <Link to="/" onClick={() => localStorage.removeItem("usuario")}>
          <button className="button" >Log out</button></Link>
          }
        {
          autho !== "admin" &&
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
      </div>
    </div>
  );
}

export default SearchBar;
