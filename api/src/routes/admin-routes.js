import { Router } from 'express'
import { forcePasswordAdmin, changeState, searchStatePayment, searchUserByUsername} from "../controllers/adminController.js";

const router = Router()

router.put('/forcepassword', forcePasswordAdmin);
router.put('/updatestate', changeState)
router.get('/filterPaymentState', searchStatePayment)
router.post('/findUser', searchUserByUsername)

export default router