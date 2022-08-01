import { Router } from 'express'
import { forcePasswordAdmin } from "../controllers/adminController.js";

const router = Router()

router.put('/forcepassword', forcePasswordAdmin);

export default router