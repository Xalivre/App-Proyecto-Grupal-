import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  sortPrice,
  sortRating,
  filterProducts,
  filterProductsByViews,
  filterProductsByDate,
} from "../../redux/actions";
import ProductCard from "../ProductCard/ProductCard";
import Style from "./Home.module.css";
import AddCartButton from "../AddCartButton/AddCartButton";
import '@splidejs/react-splide/css/skyblue';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useJwt } from "react-jwt";





function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const carousel = useSelector((state) => state.carousel);
  const mostViewed = useSelector((state) => state.mostViewed);
  const recentlyAdded = useSelector((state) => state.recentlyAdded);

  const { decodedToken, isExpired } = useJwt(localStorage.getItem("usuario"));
  console.log(decodedToken)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterProducts());
    dispatch(filterProductsByViews());
    dispatch(filterProductsByDate());
  }, [dispatch]);

  return (
    <div>
      {/* <div className={Style.imagePositioning}>
        <img
          className={Style.controllerLeft}
          src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"
          alt="img"
        />
        <img
          className={Style.axolot}
          src="https://puntociego.com.ar/download/multimedia.normal.91084a739de17b1c.67616d696e67207365747570206465736b5f6e6f726d616c2e6a7067.jpg"
          alt="img"
        />
        <img
          className={Style.controllerRight}
          src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"
          alt="img"
        />
      </div> */}

      <>
        <Splide aria-label="My Favorite Images">
          <SplideSlide>
            <img className={Style.imgCarousel} src="http://www.karlosperu.com/wp-content/uploads/2019/07/S1920x1080_VGA_GeForce-RTX-20-Super-Series_Banner_2000x720.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://www.asus.com/microsite/Graphics-Cards/GeForce-RTX-30-Series/img/bg-header.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://media.flixcar.com/f360cdn/msi-75930670-TechAdvisor_Monitor_3600x1260-master.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://www.lg.com/pe/images/plp-b2c/b2c-2/MNT-27GN950-Hero-Banner-thin-D.jpg" alt="img" />
          </SplideSlide>
     
        </Splide>
      </>

      <div className={Style.containerSections}>
        <div className={Style.section}>
          <h1 className={Style.title}> Hecha un vistazo!</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {carousel?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={Style.section}>
          <h1 className={Style.title}>Los más visitados</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {mostViewed?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={Style.section}>
          <h1 className={Style.title}>Novedades!</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {recentlyAdded?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
