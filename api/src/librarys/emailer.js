import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID =
  "814477837838-7q4addoiejdkrppc90tfphp1s251gkhn.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//04g8_LXJTl1HmCgYIARAAGAQSNwF-L9IrbDydGLxszcu6rAxJJX6n0oSAanospoeUAqQQrllAVw13eUiY-5DxijKuKY1K89a2040";

export const sendMail = async (email, username, amount) => {
  let mailOptions
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "gaminggamehub1@gmail.com",
        pass: "tzcpnaetuumckfta",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });
    const formatUsername = (username) =>  username.split("").map((l, index) => (index === 0 ? l.toUpperCase() : l.toLowerCase())).join("");

    amount ? 
       mailOptions = {
        from: '"GameHUB!" <gaminggamehub1@gmail.com>',
        to: email,
        subject: "Detalles de tu compra en GameHUB",
        html: `<p> Hola <b>${formatUsername(
          username
        )}</b>, muchas gracias por elegirnos. El monto total de tu compra es de $${amount}, para ver los detalles, dirigete a tu perfil de usuario 
  y allí verás reflejadas todas tus compras.
  En caso de necesitar ayuda, dirigete a la sección <b>Ayuda</b> donde encontraras una guía.

  Desde <b>GameHUB</b> te deseamos éxitos.</p>
  `
      }
    :  mailOptions = {
        from: '"Bienvenido/a a GameHUB!" <gaminggamehub1@gmail.com>',
        to: email,
        subject: "Te has registrado en GameHUB",
        html: `<p> Hola <b>${formatUsername(
          username
        )}</b> bienvenido/a a <b>GameHUB</b>. Para realizar una compra, selecciona todos aquellos productos que
    quieras añadir a tu carrito de compras. Esperamos que disfrutes de nuestros productos y servicios.
    En caso de necesitar ayuda, dirigete a la sección <b>Ayuda</b> donde encontraras una guía.

    Desde <b>GameHUB</b> te deseamos éxitos.</p>
    `
      };

    const result = await transporter.sendMail(mailOptions);
    return result; 
  } catch (e) {
    console.log(e);
  }
};
