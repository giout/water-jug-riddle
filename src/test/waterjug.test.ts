import app from '../app'
import request, { Response } from 'supertest'
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
    test('If y>x and y=z, it should return a 1 step solution', () => {
        expect(solveRiddle(2, 10, 10).length).toBe(1)
    })
})

describe('Integration tests to ensure the API handles requests and responses correctly', ()=> {
    let successfulResponse: Response
    beforeAll(async () => {
        successfulResponse = await request(app).post('/waterjug').send({
            x_capacity:2,
            y_capacity:10,
            z_amount_wanted:4
        })
    })
    test("Should return a json", () => {
        expect(successfulResponse.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        )
    })
    test('If a solution is provided, it should return 200 as http status code', () => {
        expect(successfulResponse.statusCode).toBe(200)
    })
    test('If a solution is provided, it should return an array', () => {
        expect(successfulResponse.body.solution).toBeInstanceOf(Array)
    })
    test('If a solution is provided, it should return an array of objects with the right properties', () => {
        const solutionProp = successfulResponse.body.solution
        expect(solutionProp[solutionProp.length-1].step).toBeDefined()
        expect(solutionProp[solutionProp.length-1].bucketX).toBeDefined()
        expect(solutionProp[solutionProp.length-1].bucketY).toBeDefined()
        expect(solutionProp[solutionProp.length-1].action).toBeDefined()
        expect(solutionProp[solutionProp.length-1].status).toBeDefined()
    })
    test('If x, y or z are not numbers, it should return 400 as http status code', async () => {
        const response = await request(app).post('/waterjug').send({
            x_capacity:'2',
            y_capacity:'6',
            z_amount_wanted:5
        })
        expect(response.statusCode).toBe(400)
    })
})
