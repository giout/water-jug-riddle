import { NextFunction, Request, Response } from "express"
import { CustomError } from '../utils/error'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) 
        return res.status(err.statusCode).json({ 
            message: err.message,
            code: err.statusCode
        })
    
    return res.status(500).json({ message: err.message, code: 500 })
}