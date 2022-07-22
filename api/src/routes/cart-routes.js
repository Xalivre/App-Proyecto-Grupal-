import { Router } from 'express'
import {addProductToCart, cartItems, deleteItems} from '../controllers/cartController.js';

const router = Router()

router.post("/cart/:id", addProductToCart)
router.get("/cart", cartItems)
router.delete("/cart/:id",deleteItems )

export default router