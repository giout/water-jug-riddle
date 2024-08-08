import { Router } from 'express'
import { solveWaterJug } from '../controllers/waterjug'
import { validateBody } from '../middlewares/validation'
import { waterJugSchema } from '../schemas/waterjug'

const router = Router()

router.post(
    '/', 
    validateBody(waterJugSchema),
    solveWaterJug
)

export default router