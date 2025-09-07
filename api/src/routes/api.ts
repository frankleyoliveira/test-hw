import { Router } from 'express'
import {
  clearHandler,
  executeHandler,
  getAllUsers,
} from '../controllers/userController'

const router = Router()

router.get('/users', getAllUsers)
router.post('/execute', executeHandler)
router.post('/clear', clearHandler)

export default router
