import { Request, Response, NextFunction } from "express"
import { catchAsync } from "../utils/error"
import { solutionBucketX, solutionBucketY } from "../utils/waterjug"

export const solveWaterJug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const x = req.body.x_capacity
    const y = req.body.y_capacity
    const z = req.body.z_amount_wanted

    // validate: y >= z > x > 0 
    if (x>=y || x>=z || z>y || x<0 || y<0 || z<0) {    
        return res.status(200).json({
            code: 200,
            message: 'No solution'
        })   
    }

    const solutionX = solutionBucketX(x,y,z) // fill x first
    const solutionY = solutionBucketY(x,y,z) // fill y first
    
    // the solution that has less steps will be selected as the greatest solution and will be retrieved to the client
    let solution = solutionX.length<=solutionY.length ? solutionX : solutionY

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