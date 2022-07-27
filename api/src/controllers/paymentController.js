import Stripe from "stripe";
import Payment from "../models/Payments.js";
import User from "../models/User.js";

const stripe = new Stripe(
  "sk_test_51LPtrNLlcvSwUKGvA46HsDBeocgeeQRHsWSLTAQeyTzHzZrTk18ml4stPalgNse5zyOObM5fLFc3yNsnmSgHnbcl00y02QLl7l"
);

export const postPayments = async (req, res) => {
  try {
    const { id, amount, cart, email} = req.body;

    if(!id || !email || !amount || !cart) return res.json({ message: "Mandatory data missing" });

    // const userDB = await User.findOne({email})
    //if (!userDB) return res.json({ msg: "User not found" });
    
    const paymentDB = await Payment.create({
      idPayment: id,
      container: cart,
      amount: amount,
    });
    paymentDB.save();

    // userDB.paymentHistory.push(paymentDB);

    // userDB.save();
    
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });
    return res.json({ message: "Succesfull payment" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e.raw.message}` });
  }
};

export const getPayments = async (req, res) => {
  try {
    const allPayment = await Payment.find({});
    if(!allPayment) return res.json({msg: "No payments found"});
    return res.json(allPayment);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const getPaymentsID = async (req, res) => {
  const { id } = req.params; 

  try{
    const userDB = await User.findOne({id}) 
    if(!userDB) return res.json({ message: "User not found" });
    const history = userDB.paymentHistory;
    return res.json(history);
  } catch (e){
    return res.json({ msg: `Error 404 - ${e}`});
  }
}