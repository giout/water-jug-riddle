import { Request, Response, NextFunction } from "express"
import { catchAsync, CustomError } from "../utils/error"
import { solveRiddle } from "../utils/waterjug"

export const solveWaterJug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const x = req.body.x_capacity
    const y = req.body.y_capacity
    const z = req.body.z_amount_wanted

    // x and y cannot be equals
    if (x==y){
        throw new CustomError('X and Y cannot be equals', 200)
    }

    // if x is bigger than y, z can't be bigger than x, and must be bigger than y (same with y)
    if (
        !(x >= z && x > y) &&
        !(y >= z && y > x)
    ) {
        throw new CustomError('The biggest bucket must have a capacity equal or bigger than the amount wanted', 200)
    }   

    let solution = solveRiddle(x, y, z)

    if (solution.length==0) throw new CustomError('No solution', 200)

    res.status(200).json({
        code: 200,
        message: "Solved",
        solution
    })
})