import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct, getCarousel, getDetails, insertionSort, lastAdded } from '../controllers/productController.js'
import {addProductToCart, CartItems, deleteItems} from "../controllers/cartController.js";
import cors from 'cors'

const router = Router()

router.use(cors())

router.get('/home', getProducts)
router.post('/home', postProduct)
router.delete('/home/:id', deleteProduct)
router.put('/product/:id', updateProduct)
router.get('/product/:id', getDetails)

router.get('/carousel', getCarousel)
router.get('/mostViewed', insertionSort)
router.get('/recentlyAdded', lastAdded)

// router.get("/Cart",)
router.post("/cart/:id", addProductToCart)
router.get("/cart", CartItems)
router.delete("/cart/:id",deleteItems )


export default router