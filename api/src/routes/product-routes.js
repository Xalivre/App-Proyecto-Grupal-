import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct,  getDetails} from '../controllers/productController.js'

const router = Router()

router.get('/home', getProducts)
router.get('/product/:id', getDetails)
router.post('/create', postProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

export default router