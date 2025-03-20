import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';

describe('PUT /editNameOfArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//initialiyte the json file with empty json
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 2 },
			{ name: 'Article 2', description: 'Another description', amount: 2 },
		];
		//initialiyte the json file with empty json
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not edit the article because of missing name field', async () => {
		const response = await request(app).put('/editNameOfArticles').send({ newName: 'Article 3' });

		expect(response.status).toBe(400);
	});

	it('should not edit the article because of missing empty entry of name field', async () => {
		const response = await request(app).put('/editNameOfArticles').send({ newName: '' });

		expect(response.status).toBe(400);
	});

	it('should not edit the article because of missing existence of artticle in database', async () => {
		const response = await request(app)
			.put('/editNameOfArticles')
			.send({ name: 'Article 45', newName: 'Article 3' });

		expect(response.status).toBe(404);
	});

	it('should edit the article name', async () => {
		const response = await request(app)
			.put('/editNameOfArticles')
			.send({ name: 'Article 1', newName: 'Article 3' });

		expect(response.status).toBe(200);
	});

	it('should not edit the article due to existence of a similar name', async () => {
		const response = await request(app)
			.put('/editNameOfArticles')
			.send({ name: 'Article 2', newName: 'Article 3' });

		expect(response.status).toBe(409);
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

describe('PUT /editDescriptionOfArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 2 },
			{ name: 'Article 2', description: 'Another description', amount: 2 },
		];
		//initialiyte the json file with empty file
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not edit the description of due to missing existence of name field', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ description: 'new Description' });

		expect(response.status).toBe(400);
	});

	it('should not edit the description of due to missing empty entry name field', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ name: '', description: 'new Description' });

		expect(response.status).toBe(400);
	});

	it('should not edit the description of due to missing existence of description field', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ name: 'Article 1' });

		expect(response.status).toBe(400);
	});

	it('should not edit the description of due to missing empty entry name field', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ name: 'Article 1', description: '' });

		expect(response.status).toBe(400);
	});

	it('should edit the description of article', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ name: 'Article 1', description: 'new Description' });

		expect(response.status).toBe(200);
	});

	it('should not edit the article due to missing existence of the given name', async () => {
		const response = await request(app)
			.put('/editDescriptionOfArticles')
			.send({ name: 'Article 3', description: 'new Description' });

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

describe('PUT /adjustAmountByName', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 50', description: 'Another description', amount: 2 },
			{ name: 'Article 2', description: 'Another description', amount: 2 },
		];
		//initialiyte the json file with empty file
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should adjust not article amount of the given name due to missing name field', async () => {
		const response = await request(app).put('/adjustAmountByName').send({ amount: 30 });

		expect(response.status).toBe(400);
	});

	it('should adjust not article amount of the given name due to insertion of article as string', async () => {
		const response = await request(app)
			.put('/adjustAmountByName')
			.send({ name: 'Article 50', amount: 'one' });

		expect(response.status).toBe(400);
	});

	it('should adjust not article amount of the given name due to empty nsertion of article name', async () => {
		const response = await request(app)
			.put('/adjustAmountByName')
			.send({ name: '', amount: 'one' });

		expect(response.status).toBe(400);
	});

	it('should adjust article amount duetomising existence of article', async () => {
		const response = await request(app)
			.put('/adjustAmountByName')
			.send({ name: 'Article 0', amount: 30 });

		expect(response.status).toBe(404);
	});

	it('should adjust article amount of the given name', async () => {
		const response = await request(app)
			.put('/adjustAmountByName')
			.send({ name: 'Article 50', amount: 30 });

		expect(response.status).toBe(200);
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

describe('PUT /increaseAllArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 2 },
			{ name: 'Article 2', description: 'Another description', amount: 3 },
		];
		//initialiyte the json file with empty json
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not increase all the article due to amount being 0', async () => {
		const response = await request(app).put('/increaseAllArticles').send({ increaseAmount: 0 });

		console.log(response.body.mesage);

		expect(response.status).toBe(400);
	});

	it('should increase all the article', async () => {
		const response = await request(app).put('/increaseAllArticles').send({ increaseAmount: 100 });

		console.log(response.body.mesage);

		expect(response.status).toBe(200);
	});

	it('should not increase articles as type given is a string', async () => {
		const response = await request(app)
			.put('/increaseAllArticles')
			.send({ increaseAmount: 'one' });

		expect(response.status).toBe(400);
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

describe('PUT /decreaseAllArticles', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 1', description: 'Another description', amount: 52 },
			{ name: 'Article 2', description: 'Another description', amount: 53 },
		];
		//initializte the json file with empty file
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
	});

	it('should not decrease all the article due to amount being 0', async () => {
		const response = await request(app).put('/decreaseAllArticles').send({ decreaseAmount: 0 });

		console.log(response.body.mesage);

		expect(response.status).toBe(400);
	});

	it('should decrease all the article', async () => {
		const response = await request(app).put('/decreaseAllArticles').send({ decreaseAmount: 100 });

		console.log(response.body);

		expect(response.status).toBe(200);
	});

	it('should not decrease articles as type given is a string', async () => {
		const response = await request(app)
			.put('/decreaseAllArticles')
			.send({ decreaseAmount: 'one' });

		expect(response.status).toBe(400);
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
