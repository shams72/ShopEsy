import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const AmountChangeSchema = z.object({
	increaseAmount: z
		.number()
		.min(1, { message: 'Increase amount must be a positive number' })
		.optional(), // Optional because we might have a decreaseAmount instead
	decreaseAmount: z
		.number()
		.min(1, { message: 'Decrease amount must be a positive number' })
		.optional(), // Optional for the same reason
});

// Middleware to validate the request
export const validateAdjustAmount = (req: Request, res: Response, next: NextFunction) => {
	const result = AmountChangeSchema.safeParse(req.body);

	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message), // Combine error messages if multiple errors
		});
		return;
	}
};
