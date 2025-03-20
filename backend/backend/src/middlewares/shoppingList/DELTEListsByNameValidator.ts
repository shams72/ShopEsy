import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema to validate the 'names' parameter.

const requestedListSchema = z.object({
	name: z
		.string()
		.min(1, 'Name parameter must not be empty')
		
});

// Middleware to validate the request
export const validateDeleteListNameParam = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const result = requestedListSchema.safeParse(req.body);

	if (result.success) {
		next();// Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.message).join(', '), // Combine error messages if multiple errors
		});
		return;
	}
};

export default validateDeleteListNameParam;
