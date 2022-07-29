import { Router } from 'express'
import {getUsers, postUsers, deleteUser, updateUser, loginUser } from "../controllers/userController.js";
import { checkAuth } from '../middleware/auth.js';
import { checkRoleAuth } from '../middleware/roleAuth.js';

const router = Router()

router.get('/accounts', /* checkAuth, checkRoleAuth(["admin"]), */ getUsers)
router.post('/accounts', getUsers)
router.post('/register', postUsers)
router.post('/login', loginUser)
router.delete('/accounts/:id', deleteUser)
router.put('/accounts/:id', updateUser)

export default router
