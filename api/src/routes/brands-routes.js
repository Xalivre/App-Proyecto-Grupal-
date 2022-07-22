import { Router } from 'express'
import { getBrands } from '../controllers/productController.js';

const router = Router();

router.get('/brands', getBrands )



export default router