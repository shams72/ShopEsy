import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';

describe('DELETE /deleteArticlesByName', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 52 },
			{ name: 'Article 2', description: 'Another description', amount: 53 },
		];
		//initialiyte the json file
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not delete the given article due to missing name field', async () => {
		const response = await request(app).delete('/deleteArticlesByName').send({});

		expect(response.status).toBe(400);
	});

	it('should not delete the given article due to empty insertion name field', async () => {
		const response = await request(app).delete('/deleteArticlesByName').send({ name: '' });

		expect(response.status).toBe(400);
	});

	it('should delete the given article', async () => {
		const response = await request(app)
			.delete('/deleteArticlesByName')
			.send({ name: 'Article 1' });

		expect(response.status).toBe(200);
	});

	it('should not delete the given articles since type doesnot exist', async () => {
		const response = await request(app)
			.delete('/deleteArticlesByName')
			.send({ name: 'Article 3' });

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});
});

describe('DELETE /deleteAllArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
			//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 52 },
			{ name: 'Article 2', description: 'Another description', amount: 53 },
		];
		//initialiyte the json file
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should delete all the given article', async () => {
		const response = await request(app).delete('/deleteAllArticles');

		expect(response.status).toBe(200);
	});

	it('should not delete the given articles since article doesnot exist anymore after first test', async () => {
		const response = await request(app).delete('/deleteAllArticles');

		expect(response.status).toBe(404);
	});
});
