import React from "react";
import styles from "./SearchBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { searchName } from "../../redux/actions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logo from "../../img/favicon.png";
import CartDrawer from "../Cart/CartDrawer.tsx"
import { useJwt } from "react-jwt";


function SearchBar(props) {

  let navigate = useNavigate();
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);


  // Vamos a manejar los productos a buscar por estados

  const [searchProduct, setSearchProduct] = useState("");

  function handleSubmit(e) {
    // searchName(searchProduct)
    e.preventDefault();
    if (searchProduct.length > 0) {
      navigate('/products')
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
        {localStorage.getItem("usuario") && <Link to="/home" onClick={() => localStorage.removeItem("usuario")}>
          <button className="button" >Log out</button>
        </Link>}
        {
          <div>
            <CartDrawer cart={cart} />
          </div>
        }
        <Link to="/wishlist">
          <div>
            <FavoriteIcon />
          </div>
        </Link>
        {/* <Link to="/createProduct">
          <div>
            <AddCircleIcon />
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default SearchBar;
