import { Router } from 'express'
import { forcePasswordAdmin, changeState, searchStatePayment} from "../controllers/adminController.js";

const router = Router()

router.put('/forcepassword', forcePasswordAdmin);
router.put('/updatestate', changeState)
router.get('/filterPaymentState', searchStatePayment)

export default router