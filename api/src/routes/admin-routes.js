import { Router } from 'express'
import { forcePasswordAdmin, changeState } from "../controllers/adminController.js";

const router = Router()

router.put('/forcepassword', forcePasswordAdmin);
router.put('/updatestate', changeState)

export default router