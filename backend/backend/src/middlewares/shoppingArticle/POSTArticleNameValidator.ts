import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Define the Zod schema
const RequestedShoppingArticleSchema = z.object({
	name: z.string().trim().min(1, { message: 'Article name is required' }), // Validate name is non-empty after trimming
	description: z.string().trim().min(1, { message: 'Article description is required' }), // Validate description is non-empty after trimming
	amount: z.number().min(1, { message: 'Article amount cannot be less than 0' }), // Validate amount is greater than 0
});

// Middleware to validate the request
export const validateRequestedShoppingArticle = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const result = RequestedShoppingArticleSchema.safeParse(req.body);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		// Extract detailed error messages

		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message),
		});
		return;
	}
};
