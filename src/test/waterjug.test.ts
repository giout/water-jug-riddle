import { solveRiddle } from '../utils/waterjug'

describe('Unit tests to verify the correctness of the algorithm', ()=> {
    test('x=2, y=10, z=4 should return a solution', () => {
        expect(solveRiddle(2, 10, 4).length).toBeGreaterThan(0)
    })
    test('x=2, y=10, z=4 should return 4 steps solution', () => {
        expect(solveRiddle(2, 10, 4).length).toBe(4)
    })
    test('x=2, y=100, z=96 should return a solution', () => {
        expect(solveRiddle(2, 100, 96).length).toBeGreaterThan(0)
    })
    test('x=2, y=100, z=96 should return a 4 steps solution', () => {
        expect(solveRiddle(2, 10, 4).length).toBe(4)
    })
    test('x=2, y=6, z=5 should not return a solution', () => {
        expect(solveRiddle(2, 6, 5).length).toBe(0)
    })
    test('If x >= y, it should not return a solution', () => {
        expect(solveRiddle(7, 6, 5).length).toBe(0)
    })
    test('If x >= z, it should not return a solution', () => {
        expect(solveRiddle(8, 10, 8).length).toBe(0)
    })
    test('If z>y, it should not return a solution', () => {
        expect(solveRiddle(8, 10, 12).length).toBe(0)
    })
    test('If y>x and y=x, it should return a 1 step solution', () => {
        expect(solveRiddle(2, 10, 10).length).toBe(1)
    })
})