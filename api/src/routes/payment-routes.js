import { Router } from 'express'
import {postPayments, getPayments, getPaymentsEmail} from '../controllers/paymentController.js'

const router = Router()

router.post("/api/checkout", postPayments)
router.get("/api/checkout", getPayments) 
router.get("/api/checkoutEmail", getPaymentsEmail)

export default router