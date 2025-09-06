import { Router } from 'express'
import { clearHandler, executeHandler } from '../controllers/userController'

const router = Router()

router.post('/execute', executeHandler)
router.post('/clear', clearHandler)

export default router
