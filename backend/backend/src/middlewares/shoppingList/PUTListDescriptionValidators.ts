import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema for the shopping list request body
const validateDescripiionChange = z.object({
	name: z.string().min(1, 'ShoppingList name is required').trim(),
	description: z.string().optional(), // description is optional
});

// Middleware to validate the request body
export const validateDescriptionChangeShoppingList = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const result = validateDescripiionChange.safeParse(req.body);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		console.log(result.error.errors);
		res.status(400).json({
			message: 'Name is required and canoot be empty',
		});
		return;
	}
};
