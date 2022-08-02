import Stripe from "stripe";
import Payment from "../models/Payments.js";
import User from "../models/User.js";
import { sendMail } from "../librarys/emailer.js";

const stripe = new Stripe(
  "sk_test_51LPtrNLlcvSwUKGvA46HsDBeocgeeQRHsWSLTAQeyTzHzZrTk18ml4stPalgNse5zyOObM5fLFc3yNsnmSgHnbcl00y02QLl7l"
);

export const postPayments = async (req, res) => {
  try {
    const { id, amount, cart, email } = req.body;

    if (!id || !email || !amount || !cart)
      return res.json({ message: "Mandatory data missing" });

    const userDB = await User.findOne({ email });
    if (!userDB) return res.json({ msg: "User not found" });

    const paymentDB = await Payment.create({
      idPayment: id,
      container: cart,
      amount: amount,
    });
    paymentDB.save();

    userDB.paymentHistory.push(paymentDB);
    userDB.save();

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "gaming", // sacarla
      payment_method: id,
      confirm: true,
    });

    sendMail(email, userDB.username, amount).then(r => console.log("payment email sended")).catch((err) => console.log(err));

    return res.send({ message: "Successful payment" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e?.raw?.message}` });
  }
};

export const getPayments = async (req, res) => {
  //admin
  try {
    const allPayment = await Payment.find({});
    if (!allPayment) return res.json({ msg: "No payments found" });
    return res.json(allPayment);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const getPaymentsEmail = async (req, res) => {
  //usuarios
  const { email } = req.query;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) return res.json({ message: "User not found" });
    const history = userDB.paymentHistory;
    return res.json(history);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const getPaymentHistory = async (req, res) => { //admin
  try{
      const users = await User.find({});
      if(!users) return res.status(404).send({ message: "Users not found" })
      const arrayHistoryUser = users.map(e => {
        return{
          _id: e._id,
          username: e.username,
          email: e.email,
          paymentHistory: e.paymentHistory
        }
      })
      return res.json(arrayHistoryUser)
  }catch(e){
    return res.json({ msg: `Error 404 - ${e}` });
  }
}

export const getPaymentHistoryUser = async (req, res) => { //admin
  const { email, id } = req.body;

  try{
    if(email){
      const userDB = await User.findOne({email});
      if(!userDB) return res.status(404).send({ message: "User not found" });
      if(userDB.paymentHistory.length > 0) {
        const payment = userDB.paymentHistory.filter(e => e.idPayment === id);
        if(payment.length === 0) return res.status(404).send({ message: "Payment not found or non-existent ID" }); 
        return res.json(payment);
        }
      }
      return res.status(404).send({ message: "User not found" });
  } catch(e){
    return res.json({ msg: `Error 404 - ${e}` });
  }
}


export const getPaymentHistoryById = async (req, res) => {
  const { id } = req.params

  try{
      if(!id) return res.status(404).send({ message: "Need an ID" });
      const userDB = await User.findById(id)
      userDB ? res.status(200).json(userDB.paymentHistory) : res.status(404).send({ message: "User not found" })

} catch(e){
    return res.json({ msg: `Error 404 - ${e}` });
  }
}