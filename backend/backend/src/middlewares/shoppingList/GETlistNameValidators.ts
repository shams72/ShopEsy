import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema to validate the 'names' parameter.
const nameParamSchema = z
	.string()
	.min(1, 'Name parameter must not be empty')
	.max(15, 'Name parameter must be less than 15 characters');

	// Middleware to validate the request
export const validateNameParam = (req: Request, res: Response, next: NextFunction): void => {
	const listName = req.params.names.trim();
	const result = nameParamSchema.safeParse(listName);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.message).join(', '), // Combine error messages if multiple errors
		});
		return;
	}
};

export default validateNameParam;
