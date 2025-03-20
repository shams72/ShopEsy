import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';

describe('GET /getAllShoppingArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 2 },
			{ name: 'Article 2', description: 'Another description', amount: 2 },
		];
		//initialiyte the json file
		await fs.writeFile(
			config.articleFilePath,
			JSON.stringify(config.shoppingArticles, null, 2),
			() => {},
		);
	});

	it('should get all the articles', async () => {
		const response = await request(app).get('/getAllShoppingArticles');

		expect(response.status).toBe(200);
	});

	afterAll(async () => {
		
		//rollback to initial state
		await fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});
});
