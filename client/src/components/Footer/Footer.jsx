import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../img/favicon.png";


function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.containerAll}>
        {/* Logo */}

        {/* Grid contenedor de los links */}
        <div className={styles.containerGrid}>
          <div className={styles.containerLinks}>
            <div className={styles.products}>
              <p className={styles.titlep}>Navegar</p>
              <ul>
                <Link className={styles.text} to="/products">
                  <li>Products</li>
                </Link>
                <Link className={styles.text} to="/ArmaTuPC">
                  <li>Arma tu Pc</li>
                </Link>
                <Link className={styles.text} to="/help">
                  <li>Ayuda</li>
                </Link>
              </ul>
            </div>
            <div className={styles.products}>
              <p className={styles.titlep}>Te ayudamos</p>
              <ul>
                <Link className={styles.text} to="/help">
                  <li>Centro de ayuda</li>
                </Link>
                <Link className={styles.text} to="/help">
                  <li>Tipos de entrega</li>
                </Link>
                <Link className={styles.text} to="/help">
                  <li>Cambios y devoluciones</li>
                </Link>
                <Link className={styles.text} to="/help">
                  <li>Términos y condiciones</li>
                </Link>
                <Link className={styles.text} to="/help">
                  <li>Comprobantes electrónicos</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className={styles.socialApps}>
            <p className={styles.titlep}>Síguenos</p>
            <div className={styles.icons}>
              <a
                className={styles.icon}
                rel="noreferrer"
                href="https://www.facebook.com"
                target="_blank"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                className={styles.icon}
                rel="noreferrer"
                href="https://www.instagram.com"
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                className={styles.icon}
                rel="noreferrer"
                href="https://www.twitter.com"
                target="_blank"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
