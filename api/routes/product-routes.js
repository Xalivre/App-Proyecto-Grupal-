import { Router } from 'express'
import { getProducts, postProduct, deleteProduct, updateProduct } from '../controllers/index.js'

const router = Router()

router.get('/home', getProducts)
router.post('/home', postProduct)
router.delete('/home/:id', deleteProduct)
router.put('/home/:id', updateProduct)


export default router