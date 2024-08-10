
# Water Jug API
- [Tech stack](#tech-stack)
- [Required installations](#required-installations)
- [Commands](#commands)
    - [Install dependencies](#install-dependencies)
    - [Apply tests](#apply-tests)
    - [Generate Js code](#generate-js-code)
    - [Deploy in develop mode](#deploy-in-develop-mode)
    - [Deploy in production mode](#deploy-in-production-mode)
- [API documentation](#api-documentation)
- [What is the Water Jug riddle?](#what-is-the-water-jug-riddle)
- [Explanation of the algorithm used to solve the riddle](#explanation-of-the-algorithm-used-to-solve-the-riddle)

## Tech stack
* [Node.js](https://nodejs.org)
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [Typescript](https://www.typescriptlang.org)
* [Express](https://expressjs.com)

## Required installations
* [Node.js](https://nodejs.org/) - This project was developed using v20.10.0.

## Commands

### Install dependencies
It is mandatory to install dependencies before executing any other step.
```sh
$ npm install
```

### Apply tests
Unit and integration tests ensure the API is working properly, it should be done before deploying the server.
```sh
$ npm run test
```

### Generate Js code
Transpile .ts files into .js files, store them at */dist* folder and run these .js files.
```sh
$ npm run build
```

### Deploy in develop mode
```sh
$ npm run dev
```

### Deploy in production mode
Deploy
```sh
$ npm run start
```
(This command will automatically transpile .ts files into .js files, store them at */dist* folder and run these .js files).

## API documentation

#### Solve riddle

```http
  POST /waterjug
```

**Request body example**

```json
{
    "x_capacity": 2,
    "y_capacity": 10,
    "z_amount_wanted": 4
}
```

**Response body examples**<br>
http status: 200
```json
  {
    "code": 200,
    "message": "Solved",
    "solution": [
        {
            "step": 1,
            "bucketX": 2,
            "bucketY": 0,
            "action": "Fill bucket X"
        },
        {
            "step": 2,
            "bucketX": 0,
            "bucketY": 2,
            "action": "Transfer from bucket X to Y"
        },
        {
            "step": 3,
            "bucketX": 2,
            "bucketY": 2,
            "action": "Fill bucket X"
        },
        {
            "step": 4,
            "bucketX": 0,
            "bucketY": 4,
            "action": "Transfer from bucket X to Y",
            "status": "Solved"
        }
    ]
  }
```

http status: 400
```json
  {
    "code": 400,
    "message": "x must be positive. y must be an integer. ",
  }
```

http status: 400
```json
  {
    "code": 400,
    "message": "No solution"
  }
```

The next URL provides a static webpage with an API documentation just like the one above.

```http
GET /docs 
```

## What is the Water Jug riddle?
It is a classic logic puzzle, in which you have a x gallon jug and a y gallon jug, and as much water as you need. The riddle is: how do you measure out exactly z gallons using only these two jugs? 

## Explanation of the algorithm used to solve the riddle
The development of an algorithm that provides a solution for this riddle using any input starts from watching different solutions and identifying common patterns between them. These common patterns were taken as axioms. From these axioms, an algorithm was created.
### Axioms
Let's observe the next scenarios:
#### Input 1 -> x=2, y=10, z=4
*Fill the x bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|2|0|Fill bucket x|
|0|2|Transfer from bucket x to y|
|2|2|Fill bucket x|
|0|4|Transfer from bucket x to bucket y. **Solved**|

*Fill the y bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|0|10|Fill bucket y|
|2|8|Transfer from bucket y to bucket x|
|0|8|Empty bucket x|
|2|6|Transfer from bucket y to bucket x|
|0|6|Empty bucket x|
|2|4|Transfer from bucket y to bucket x. **Solved**|

#### Input 2 -> x=2, y=100, z=96
*Fill the x bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|2|0|Fill bucket x|
|0|2|Transfer from bucket x to bucket y|
|2|2|Fill bucket x|
|0|4|Transfer from bucket x to bucket y|
|...|...|Repeat these steps...|
|0|96|Transfer bucket x to bucket y. **Solved**|

*Fill the y bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|0|100|Fill bucket y|
|2|98|Transfer from bucket y to bucket x|
|0|98|Empty bucket x|
|2|96|Transfer from bucket y to bucket x. **Solved**|

<br>
Previous examples present these common patterns:

- If any of the 3 values is negative, there is no possible solution.
- One of these conditions must be true for a solution to be possible: x >= z > y or y >= z > x.
- There are 2 possible solutions at most:
    - Start filling x bucket.
    - Start filling y bucket.
- If solution starts with the filling of bucket y, it will never empty (same with bucket x).
- If solution starts with the filling of bucket x, its content will always be transfered to bucket y, and never viceversa (same with bucket y).

#### Input 3 -> x=2, y=6, z=5
*Fill the x bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|2|0|Fill bucket x|
|0|2|Transfer from bucket x to bucket y|
|2|2|Fill bucket x|
|0|4|Transfer from bucket x to bucket y|
|2|4|Fill bucket x|
|0|6|Transfer from bucket x to bucket y|
|0|0|Empty bucket y. We are back at the beginning. There is **No Solution**| 

*Fill the y bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|0|6|Fill bucket y|
|2|4|Transfer from bucket y to bucket x|  
|0|4|Empty bucket x|
|2|2|Transfer from bucket y to bucket x|
|0|2|Empty bucket x|
|2|0|Transfer from bucket y to bucket x|
|0|0|Empty bucket x. We are back at the beginning. There is **No Solution**|

#### Input 4 -> x=3, y=9, z=5
*Fill the x bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|3|0|Fill bucket x|
|0|3|Transfer from bucket x to bucket y|
|3|3|Fill bucket x|
|0|6|Transfer from bucket x to bucket y|
|3|6|Fill bucket x| 
|0|9|Transfer from bucket x to bucket y|
|0|0|Empty bucket y. We are back at the beginning. There is **No Solution**|

*Fill the y bucket first*
| Bucket x | Bucket y | Explanation |
| :---- | :----: | ----: |
|0|9|Fill bucket y|
|3|6|Transfer from bucket y to bucket x| 
|0|6|Empty bucket x|
|3|3|Transfer from bucket y to bucket x|
|0|3|Empty bucket x|
|3|0|Transfer from bucket y to bucket x|
|0|0|Empty bucket x. We are back at the beginning. There is **No Solution**|

<br>
We can observe in the last 2 examples that:

- If we fill bucket x first and we get to the point where bucket y is full and bucket x is empty, it becomes an endless cycle. Therefore, there is no possible solution. This also happens if we fill bucket first.
<br>
If we watch all the examples as a whole we can also observe that:

- There are two possible solutions or zero solutions, there is no middle ground. 

### Steps to find a solution
Following the axioms discovered through the observation of success and failure scenarios, a series of steps were built to find the 2 possible solutions.<br>We must validate the input and then start to execute the solutions. In both processes, the first step is to start a loop that ends if the biggest bucket has the amount wanted (z). Inside the loop, the next actions will be executed in order:

#### Solution 1: filling bucket x first
- If bucket y is full and bucket x is empty:
    - End loop, return no solution.
- If bucket y is not full and bucket x is empty:
    - Fill bucket x.
    - Store step.
    - Continue loop.
- If bucket y is full and bucket x is not empty:
    - Empty bucket y.
    - Store step.
    - Continue loop.
- If bucket y is not full and bucket x is not empty:
    - Transfer bucket x content to bucket y.
    - Store step.
    - Continue loop.

#### Solution 2: filling bucket y first
- If bucket x is full and bucket y is empty:
    - End loop, return no solution.
- If bucket x is not full and bucket y is empty:
    - Fill bucket y.
    - Store step.
    - Continue loop.
- If bucket x is full and bucket y is not empty:
    - Empty bucket x.
    - Store step.
    - Continue loop.
- If bucket x is not full and bucket y is not empty:
    - Transfer bucket y content to bucket x.
    - Store step.
    - Continue loop.

### Choosing an efficient solution
Once we have two solutions, each one stored in its corresponding data structure, we choose as the best solution the one that has fewer steps.
### Algorithm summary
- Validate x >= z > y or y >= z > x.
- Execute and store [solution attempt 1](#solution-1-filling-bucket-x-first).
- If solution attempt 1 fails, return no solution.
- Execute and store [solution attempt 2](#solution-2-filling-bucket-y-first).
- Return the solution attempt that has fewer steps.
