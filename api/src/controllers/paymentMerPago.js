import axios from "axios"
export async function createPayment({emailUser, items}) {
  
  const url = "https://api.mercadopago.com/checkout/preferences";
  
  const body = {
    payer_email: emailUser,
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

  return payment.data.init_point;
}

export const paymentMercadoPago = async (req, res) => {

  let data = req.body
    try {
      const payment = await createPayment(data);
      return res.json(payment);
    } catch (error) {
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
    }
}