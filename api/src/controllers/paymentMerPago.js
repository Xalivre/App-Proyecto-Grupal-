import axios from "axios"
export async function createPayment({emailUser, items}) {
  
  const url = "https://api.mercadopago.com/checkout/preferences";
  
  const body = {
    payer_email: emailUser,
    items,
    back_urls: {
      failure: "http://localhost:3001/canceledbuy",
      pending: "http://localhost:3001/pendingbuy",
      success: "http://localhost:3001/successbuy"
    }
  };
  
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });

  return payment.data.init_point;
}

