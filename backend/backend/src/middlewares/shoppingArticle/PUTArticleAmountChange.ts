import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

//Define the Schema
const RequestedAmountChangeSchema = z.object({
	name: z.string().min(1, { message: 'Article name is required' }),
	amount: z
		.number({ invalid_type_error: 'Amount must be a number' })
		.positive({ message: 'Please enter a positive number' }),
});

// Middleware to validate the request
export const validateAdjustAmountByName = (req: Request, res: Response, next: NextFunction) => {
	const result = RequestedAmountChangeSchema.safeParse(req.body);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message), // Combine error messages if multiple errors
		});
		return;
	}
};
