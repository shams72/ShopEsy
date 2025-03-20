import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema for the shopping list request body
const requestedListSchema = z.object({
	name: z.string().min(1, 'ShoppingList name is required').trim(),
	description: z.string().optional(), // description is optional
	item: z.array(z.string()).length(0, 'Shopping List items must be an empty array').default([]),
});

// Middleware to validate the request body
export const validateCreateShoppingList = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const result = requestedListSchema.safeParse(req.body);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		console.log(result.error.errors);
		res.status(400).json({
			message: 'names is required',
		});
		return;
	}
};
