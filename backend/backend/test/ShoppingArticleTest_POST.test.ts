import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';

describe('POST /createShoppingArticle', () => {
	beforeAll(async () => {
		//initialiyte the json file with empty json
		await fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not insert a new article due to missing existence of name field', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			description: 'A new description',
			amount: 1,
		});

		expect(response.status).toBe(400);
	});

	it('should not insert a new article due to insertion of a number as string', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			name: 'Article 1',
			description: 'A new description',
			amount: 'one',
		});

		expect(response.status).toBe(400);
	});

	it('should not insert a new article due to empty entry of name field', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			name: '',
			description: 'A new description',
			amount: 40,
		});

		expect(response.status).toBe(400);
	});

	it('should insert a new article', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			name: 'Article 1',
			description: 'A new description',
			amount: 1,
		});

		expect(response.status).toBe(200);
		expect(response.body.data.name).toBe('Article 1');
	});

	it('should insert a second distinct article', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			name: 'Article 2',
			description: 'Another description',
			amount: 2,
		});

		expect(response.status).toBe(200);
	});

	it('should not insert the given article due to existence of similar name', async () => {
		const response = await request(app).post('/createShoppingArticle').send({
			name: 'Article 2',
			description: 'Another description',
			amount: 2,
		});

		expect(response.status).toBe(409);
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
