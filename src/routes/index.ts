import { Router } from 'express'
import waterJugRouter from './waterjug'

const router = Router()

const routes = [
    {
        path: '/waterjug',
        router: waterJugRouter
    }
]

routes.forEach(route => {
    router.use(route.path, route.router)
})

export default router