import { Router } from 'express'
import {getUsers, postUsers, deleteUser, updateUser} from "../controllers/userController.js";
import cors from 'cors'

const router = Router()

router.use(cors())

router.get('/accounts', getUsers)
router.post('/accounts', postUsers)
router.delete('/accounts/:id', deleteUser)
router.put('/accounts/:id', updateUser)

export default router
