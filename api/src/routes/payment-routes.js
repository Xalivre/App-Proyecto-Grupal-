import { Router } from 'express'
import {postPayments, getPayments, getPaymentsID} from '../controllers/paymentController.js'

const router = Router()

router.post("/api/checkout", postPayments)
router.get("/api/checkout", getPayments) 
router.get("/api/checkout/:id", getPaymentsID)

export default router