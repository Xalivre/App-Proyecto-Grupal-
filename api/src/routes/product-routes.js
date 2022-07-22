import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct,  getDetails, getCategories} from '../controllers/productController.js'

const router = Router()

router.get('/home', getProducts)
router.get('/product/:id', getDetails)
router.get('/categories', getCategories)
router.post('/create', postProduct)
router.put('/product/:id', updateProduct)
router.delete('/home/:id', deleteProduct)

export default router