import { Request, Response, NextFunction } from "express"
import { catchAsync } from "../utils/error"
import { solveRiddle } from "../utils/waterjug"

export const solveWaterJug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const x = req.body.x_capacity
    const y = req.body.y_capacity
    const z = req.body.z_amount_wanted

    const solution = solveRiddle(x, y, z)

    if (solution.length > 0) {
        solution[solution.length-1].status = 'Solved'
        res.status(200).json({
            code: 200,
            message: "Solved",
            solution
        })
    } else {
        return res.status(200).json({
            code: 200,
            message: 'No solution'
        })   
    }
})