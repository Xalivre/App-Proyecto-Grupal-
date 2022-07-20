import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct, getCarrusel } from '../controllers/productController.js'

const router = Router()

router.get('/home', getProducts)
router.post('/home', postProduct)
router.delete('/home/:id', deleteProduct)
router.put('/home/:id', updateProduct)
router.get('/carrusel', getCarrusel)


export default router