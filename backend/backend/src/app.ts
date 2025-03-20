import shoppingArticleRoutes from './routes/ShoppingArticleRoutes';
import shoppingListRoutes from './routes/ShoppingListsRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerConfig';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//swagger docs for article
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		swaggerOptions: {
			plugins: [/*DisableTryItOutPlugin*/],
		},
	}),
);

//swagger docs for list
app.use(
	'/shoppingList-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		swaggerOptions: {
			plugins: [/*DisableTryItOutPlugin*/],
		},
	}),
);

//link to the routes
app.use(shoppingArticleRoutes);
app.use(shoppingListRoutes);

export default app;
