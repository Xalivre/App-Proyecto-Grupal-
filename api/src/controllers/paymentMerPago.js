import axios from "axios"
export async function createPayment({email, items}) {
  
  const url = "https://api.mercadopago.com/checkout/preferences";
  
  const body = {
    payer_email: email,
    items,
    back_urls: {
      failure: `http://localhost:3001/canceledbuy`,
      pending: `http://localhost:3001/pendingbuy`,
      success: `http://localhost:3001/successbuy`
    }
  };
  console.log("PASEEEEEEEE BORJAAAA", body)
  
  
  //console.log(email,items, idUser, totalpurchase, idAddress, branchOfficeId);
  
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });
  console.log("PASEEEEEEEE BORJAAAA")

  console.log(payment)
  return payment.data.init_point;
}