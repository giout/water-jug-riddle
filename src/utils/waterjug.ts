import { Step } from "../types/waterJug"

/*
axioms in the riddle:
* if any of the 3 values is negative, there is no possible solution
* if x is equal or bigger than y or z, there is no possible solution
* if z is bigger than y, there is no possible solution
* there are 2 possible solutions at most:
    1. start filling bucket x 
    2. start filling bucket y 
* if solution starts with the filling of bucket x, it will never empty (same with bucket y)
* if solution starts with the filling of bucket x, its content will always be transfered to bucket y, and not viceversa (same with bucket y) 
*/

export const solveRiddle = (x: number, y: number, z: number): Array<Step> => {
    // if no solution is provided, it should return []
    // validate: y >= z > x > 0 
    if (x<0 || y<0 || z<0) {    
        return []
    }
    const solutionX = solutionBucketX(x,y,z) // fill bucket x first

    // if solutionX fails, process ends
    if (solutionX.length == 0){
        return []
    }

    const solutionY = solutionBucketY(x,y,z) // fill bucket y first
    // the solution that has less steps will be selected as the greatest solution and will be retrieved to the client
    let solution = solutionX.length<=solutionY.length ? solutionX : solutionY
    solution[solution.length-1].status = 'Solved'
    return solution
}

const solutionBucketX = (x: number, y: number, z: number): Array<Step> => {
    const solution: Array<Step> = []
    let bucketX = 0
    let bucketY = 0
    let step = 0

    // while the biggest bucket does not have the amount wanted...
    while((bucketY!=z && y>x) || (bucketX!=z && x>y)) {
        // if bucket y is full and bucket x is empty there is no possible solution, it becomes an endless cycle
        if (bucketY==y && bucketX==0) {
            return []
        }
        // if bucket y is not full and bucket x is empty, fill bucket x  
        else if (bucketY<y && bucketX==0) {
            step++
            bucketX = x
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Fill bucket X`
            })
        }
        // if bucket y is full and bucket x is not empty, empty bucket y
        else if (bucketY==y && bucketX>0) {
            step++
            bucketY = 0
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Empty bucket Y`
            })
        }
        // if bucket y is not full and bucket x is not empty, transfer bucket x content to bucket y
        else if (bucketY<y && bucketX>0) {
            step++
            if ((bucketX + bucketY) > y){
                bucketX = (bucketX+bucketY) - y
                bucketY = y
            } else {
                bucketY += bucketX
                bucketX = 0
            }
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Transfer from bucket X to Y`
            })
        }
    }

    return solution
}

const solutionBucketY = (x: number, y: number, z: number): Array<Step> => {
    const solution: Array<Step> = []
    let bucketX = 0
    let bucketY = 0
    let step = 0

    // while the biggest bucket does not have the amount wanted...
    while((bucketY!=z && y>x) || (bucketX!=z && x>y)) {
        // if bucket x is full and bucket y is empty, there is no possible solution, it becomes an endless cycle
        if (bucketX==x && bucketY==0) {
            return []
        }
        // if bucket x is not full and bucket y is empty, fill bucket y  
        else if (bucketX<x && bucketY==0) {
            step++
            bucketY = y
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Fill bucket Y`
            })
        }
        // if bucket x is full and bucket y is not empty, empty bucket x
        else if (bucketX==x && bucketY>0) {
            step++
            bucketX = 0
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Empty bucket X`
            })
        }
        // if bucket x is not full and bucket y is not empty, transfer bucket y content to bucket x
        else if (bucketX<x && bucketY>0) {
            step++
            if ((bucketX + bucketY) > x){
                bucketY = (bucketX+bucketY) - x
                bucketX = x
            } else {
                bucketX += bucketY
                bucketY = 0
            }
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Transfer from bucket Y to X`
            })
        }
    }

    return solution
}