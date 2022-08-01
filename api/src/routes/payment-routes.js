import { Router } from 'express'
import {postPayments, getPayments, getPaymentsEmail, getPaymentHistory, getPaymentHistoryUser} from '../controllers/paymentController.js'
import {paymentMercadoPago} from '../controllers/paymentMerPago.js'

const router = Router()

router.post("/api/checkout", postPayments)
router.get("/api/checkout", getPayments) 
router.get("/api/checkoutEmail", getPaymentsEmail)
router.post("/api/paymentMerpago", paymentMercadoPago);
//admin

router.get("/api/paymentHistory", getPaymentHistory)
router.post("/api/paymentHistory", getPaymentHistoryUser)

export default router