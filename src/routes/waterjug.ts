import { Router } from 'express'
import { solveWaterJug } from '../controllers/waterjug'

const router = Router()

router.post('/', solveWaterJug)

export default router