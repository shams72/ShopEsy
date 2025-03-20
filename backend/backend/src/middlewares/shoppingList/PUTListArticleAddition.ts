import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema for the shopping list request body
const ListItemSchema = z.object({
	name: z.string().min(1, { message: 'Item name is required' }),
	description: z.string().min(1, { message: 'Item description is required' }),
	amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
});

// Define Zod schema for validating the RequestedList type
const ListArticleAdditionSchema = z.object({
	listName: z.string().min(1, { message: 'ShoppingList name is required' }),
	articles: ListItemSchema, // Ensure item is an array of ListItem objects
});
// Middleware to validate the request body
export const validateListArticleAddition = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const result = ListArticleAdditionSchema.safeParse(req.body);
	console.log(req.body);
	

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		console.log(result.error.errors);
		console.log('hi');
		console.log(req.body)
		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message),
		});
		return;
	}
};
