import { Router } from 'express'
import {getCarousel, insertionSort, lastAdded } from '../controllers/filtersController.js';

const router = Router();

router.get('/carousel', getCarousel)
router.get('/mostViewed', insertionSort)
router.get('/recentlyAdded', lastAdded)

export default router