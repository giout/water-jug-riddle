import { Request, Response, NextFunction } from "express";

export const solveWaterJug = (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).json({
        "code": 200,
        "solution": "Expected"
    })
}