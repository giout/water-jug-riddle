import { Step } from "../types/waterJug"

/*
axioms in the riddle:
* if any of the 3 values is negative, there is no possible solution
* if x is equal or bigger than y or z, there is no possible solution
* if z is bigger than y, there is no possible solution
* there are 2 possible solutions at most:
    1. start filling x bucket
    2. start filling y bucket
* if solution starts with the filling of x, x will never empty (same with y)
* if solution starts with the filling of x, x content will always be transfered to y, and not viceversa (same with y) 
*/
export const solutionBucketX = (x: number, y: number, z: number): Array<Step> => {
    const solution: Array<Step> = []
    let bucketX = 0
    let bucketY = 0
    let step = 0

    while(bucketY != z) {
        // if y is full and x is empty there is no possible solution, it becomes an endless cycle
        if (bucketY==y && bucketX==0) {
            return []
        }
        // if y is not full and x is empty, next step should be fill x  
        if (bucketY<y && bucketX==0) {
            step++
            bucketX = x
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Fill bucket X`
            })
        }
        // if y is full and x is not empty, next step hould be empty y
        if (bucketY==y && bucketX>0) {
            step++
            bucketY = 0
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Empty bucket Y`
            })
        }
        // if y is not full and x is not empty, next step should be transfer x content to y
        if (bucketY<y && bucketX>0) {
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

export const solutionBucketY = (x: number, y: number, z: number): Array<Step> => {
    const solution: Array<Step> = []
    let bucketX = 0
    let bucketY = 0
    let step = 0

    while(bucketY != z) {
        // if x is full and y is empty there is no possible solution, it becomes an endless cycle
        if (bucketX==x && bucketY==0) {
            return []
        }
        // if x is not full and y is empty, next step should be fill y  
        if (bucketX<x && bucketY==0) {
            step++
            bucketY = y
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Fill bucket Y`
            })
        }
        // if x is full and y is not empty, next step hould be empty x
        if (bucketX==x && bucketY>0) {
            step++
            bucketX = 0
            solution.push({
                step,
                bucketX, 
                bucketY,
                action: `Empty bucket X`
            })
        }
        // if y is not full and x is not empty, next step should be transfer x content to y
        if (bucketX<x && bucketY>0) {
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