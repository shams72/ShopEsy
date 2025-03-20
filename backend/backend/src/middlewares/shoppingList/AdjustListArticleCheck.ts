import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Define Zod schema to validate the request parameters
const RequestSchema = z.object({
	listName: z.string().min(1, { message: ' Name or Name field cannot be empty' }), // listName should be a non-empty string
	articleName: z.string().min(1, { message: 'Article Name or Field cannot be empty' }), // articleName should be a non-empty string
	amount: z.number().min(0, { message: 'Please enter a positive number' }).nullable(), // amount should be a non-negative number or null
});

// Middleware to validate the request
export const adjutListArticleInRequest = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	// Validate the request body using Zod
	const result = RequestSchema.safeParse(req.body);

	if (result.success) {
		next();  // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message),
		});
		return;
	}
};
