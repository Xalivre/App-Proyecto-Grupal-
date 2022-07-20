import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct, getCarousel, getDetails } from '../controllers/productController.js'
import cors from 'cors'

const router = Router()

router.use(cors())

router.get('/home', getProducts)
router.post('/home', postProduct)
router.delete('/home/:id', deleteProduct)
router.put('/product/:id', updateProduct)
router.get('/carousel', getCarousel)
router.get('/product/:id', getDetails)


export default router