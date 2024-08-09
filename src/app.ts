import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import { errorHandler } from './middlewares/error'
import swaggerUi from 'swagger-ui-express'
import { swaggerDoc } from './config/docs'

const app = express()

app.use(morgan('dev'))
app.use(cors()) // allow access to any ip 
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/', router)
app.use(errorHandler)

export default app