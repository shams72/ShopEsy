import { Options } from 'swagger-jsdoc';
const swaggerOptions: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Shopping Article - Shopping List API',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:8087', // Replace with your base URL
				description: 'Development server',
			},
		],
	},
	apis: [
		'src/swaggerDocumentation/shoppingArticleDOCS.ts',
		'src/swaggerDocumentation/shoppingListDOCS.ts',
	],
};

export default swaggerOptions;
