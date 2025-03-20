import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema for the shopping list request body
const requestedListSchema = z.object({
	name: z.string().min(1, 'ShoppingList name is required').trim(),
	newName: z.string().min(1, 'ShoppingList New name is required').trim(),
});

// Middleware to validate the request body
export const validateEditNameList = (req: Request, res: Response, next: NextFunction): void => {
	const result = requestedListSchema.safeParse(req.body);

	if (result.success) {
		next();  // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors[0].message + ' name/NewName field is not inserted', // Combine error messages if multiple errors
		});
		return;
	}
};
