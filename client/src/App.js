import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Help from "./components/Help/Help";
import Details from "./components/Details/Details";
import ProductsList from "./components/ProductsList/ProductsList";
import Cart from "./components/Cart/Cart";
import './global.css'
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/product/:id" element={<Details />} />
        <Route exact path="/products" element={<ProductsList />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
