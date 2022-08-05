import { Router } from 'express'
import {postPayments, getPayments, getPaymentsEmail, getPaymentHistory, getPaymentHistoryUser, getPaymentHistoryById} from '../controllers/paymentController.js'
import {createPayment} from '../controllers/paymentMerPago.js'

const router = Router()

router.post("/api/checkout", postPayments);
router.get("/api/checkout", getPayments);
router.get("/api/checkoutEmail", getPaymentsEmail);
router.post("/api/paymentMerpago", async function (req, res) {
    let data = req.body
    try {
      const payment = await createPayment(data);
      return res.json(payment);
    } catch (error) {
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
    }
});
router.get("/api/paymentHistory/:id", getPaymentHistoryById);

//admin
router.get("/api/paymentHistory", getPaymentHistory);
router.post("/api/paymentHistory", getPaymentHistoryUser);

export default router