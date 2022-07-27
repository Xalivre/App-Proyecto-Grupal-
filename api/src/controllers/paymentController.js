import Stripe from "stripe";
import Payment from "../models/Payments.js";

const stripe = new Stripe(
  "sk_test_51LPtrNLlcvSwUKGvA46HsDBeocgeeQRHsWSLTAQeyTzHzZrTk18ml4stPalgNse5zyOObM5fLFc3yNsnmSgHnbcl00y02QLl7l"
);

export const postPayments = async (req, res) => {
  console.log(req.body);
  try {
    const { id, amount, cart } = req.body;

    const paymentDB = await Payment.create({
      idPayment: id,
      container: cart,
      amount: amount,
    });

    paymentDB.save();

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });
    res.send({ message: "Succesfull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const allPayment = await Payment.find({});

    return res.json(allPayment);
  } catch (e) {
    console.log(e);
  }
};
