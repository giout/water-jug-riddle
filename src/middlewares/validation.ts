import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { CustomError } from '../utils/error';

export const validateBody = (schema: ZodSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result: any = schema.safeParse(req.body)
		if (result.error) {
			let errorMessage = ''
			for (const issue of result.error.issues){
				errorMessage += `${issue.message}. `
			}
			return next(new CustomError(errorMessage, 400))
		}
		next()
	}
}