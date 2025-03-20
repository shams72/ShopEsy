import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Zod schema for the request body of editDescriptionofArticles
const EditDescriptionSchema = z.object({
    name: z.string().min(1, { message: 'Article name is required' }),
    description: z.string().min(1, { message: 'Article description cannot be empty' }),
});

// Middleware to validate the request
export const validateEditDescription = (req: Request, res: Response, next: NextFunction) => {
    const result = EditDescriptionSchema.safeParse(req.body);
  
   
	if (result.success) {
		next(); // Proceed if validation passes
	} else {
		res.status(400).json({
			message: result.error.errors.map((e) => e.path[0] + e.message), // Combine error messages if multiple errors
		});
		return;
	}

  
};
