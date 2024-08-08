import { Request, Response, NextFunction } from "express";
import { catchAsync, CustomError } from "../utils/error";

export const solveWaterJug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError('Error', 500)
    res.status(200).json({
        "code": 200,
        "solution": "Expected"
    })
})