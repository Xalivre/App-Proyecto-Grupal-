import { Router } from 'express'
import {postPayments, getPayments} from '../controllers/paymentController.js'

const router = Router()

router.post("/api/checkout", postPayments)
router.get("/api/checkout", getPayments)



export default router