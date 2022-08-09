import { Router } from 'express'
import {getUsers, getUser, postUsers, deleteUser, updateUser, loginUser, postUsersGoogle, updateWishList, deleteWishList } from "../controllers/userController.js";
import { checkAuth } from '../middleware/auth.js';
import { checkRoleAuth } from '../middleware/roleAuth.js';

const router = Router()

router.get('/accounts', /* checkAuth, checkRoleAuth(["admin"]), */ getUsers)
router.post('/accounts', getUsers)
router.get('/accounts/:id', getUser)
router.delete('/accounts/:id', deleteUser)
router.put('/accounts/:id', updateUser)
router.put('/accounts/wishList/:id', updateWishList)
router.put('/accounts/removeFromWishList/:id', deleteWishList)

router.post('/registerGoogle', postUsersGoogle)
router.post('/register', postUsers)
router.post('/login', loginUser)

// router.put('/updateInfoUser', )

export default router
