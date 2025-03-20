import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define a Zod schema to validate the 'names' parameter.
const nameParamSchema = z.object({
	name: z.string().min(1, { message: 'Name parameter must not be empty' }),
});

// Middleware to validate the request
export const validateNameParam = (req: Request, res: Response, next: NextFunction): void => {
	const result = nameParamSchema.safeParse(req.body);


	if (result.success) {
		next();  // Proceed if validation passes
	} else {
		res.status(400).json({
			message: "name parameter must not be empty/be a string", // Combine error messages if multiple errors
		});
		return;
	}
};

export default validateNameParam;
