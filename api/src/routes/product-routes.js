import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct,  getDetails, productComments} from '../controllers/productController.js'

const router = Router()

router.get('/home', getProducts)
router.get('/product/:id', getDetails)
router.post('/createProduct', postProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)
router.put('/comments', productComments)

export default router