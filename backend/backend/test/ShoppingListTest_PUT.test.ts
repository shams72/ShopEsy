import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';
import listData from './testJSON/testListData.json';


describe('PUT /adjustArticleAmountInListByName', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];
		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: '4K TV', description: '65-inch 4K UHD TV.', amount: 100 },
		];
		config.shoppingLists.shoppingLists = [...listData];

		//initialiyte the json file
		await fs.writeFile(
			config.articleFilePath,
			JSON.stringify(config.shoppingArticles, null, 2),
			() => {},
		);
		await fs.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
			() => {},
		);
	});

	it('should not adjust the given Article amount in list due to missing existence of list name field', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ articleName: '4K TV', amount: 30 });

		expect(response.status).toBe(400);
	});

	it('should not adjust the given Article amount in list due to empty entry of list name field', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ listName: '', articleName: '4K TV', amount: 30 });

		expect(response.status).toBe(400);
	});

	it('should not adjust the given Article amount in list due to insertion of article amount as string', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ articleName: '4K TV', amount: 'one' });

		expect(response.status).toBe(400);
	});

	it('should adjust given Article Amount In List', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ listName: 'Sample List 1', articleName: '4K TV', amount: 30 });

		expect(response.status).toBe(200);
	});

	it('should not adjust the given Article Amount In List due to missing existence of the given list', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ listName: 'Sample List 6', articleName: '4K TV', amount: 20 });

		expect(response.status).toBe(404);
	});

	it('should not adjust the given Article Amount In List due to missing existence of the given article', async () => {
		const response = await request(app)
			.put('/adjustArticleAmountInListByName')
			.send({ listName: 'Sample List 1', articleName: 'Apple', amount: 30 });

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('PUT /editNameOfShoppingLists', () => {
	beforeAll(async () => {
		config.shoppingLists.shoppingLists = [];
		//create a json object
		config.shoppingLists.shoppingLists = [...listData];
		//initialiyte the json file

		await fs.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
			() => {},
		);
	});

	it('should nott edit name due to mising existence of list name field', async () => {
		const response = await request(app)
			.put('/editNameOfShoppingLists')
			.send({ newName: 'Electronics' });

		expect(response.status).toBe(400);
	});

	it('should nott edit name due to mising empty Entry of list name field', async () => {
		const response = await request(app)
			.put('/editNameOfShoppingLists')
			.send({ name: listData[2].name, newName: 'Electronics' });

		expect(response.status).toBe(400);
	});

	it('should edit name of given list name', async () => {
		const response = await request(app)
			.put('/editNameOfShoppingLists')
			.send({ name: listData[0].name, newName: 'Electronics' });

		expect(response.status).toBe(200);
	});

	it('should not edit name of given list name due to existence of similar name', async () => {
		const response = await request(app)
			.put('/editNameOfShoppingLists')
			.send({ name: listData[0].name, newName: listData[1].name });

		expect(response.status).toBe(409);
	});

	it('should not edit name given list name due to missing existence of the given name', async () => {
		const response = await request(app)
			.put('/editNameOfShoppingLists')
			.send({ name: 'Essentials', newName: 'Electronics' });

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('PUT /editDescriptionOfShoppingLists', () => {
	beforeAll(async () => {
		//create a json object
		config.shoppingLists.shoppingLists = [...listData];
		//initialiyte the json file
		await fs.promises.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
		);
	});

	it('should not edit description of given list name due to missing existence of name field', async () => {
		const response = await request(app).put('/editDescriptionOfShoppingLists').send({
			name: listData[2].name,
			description: 'Electronics Description',
		});

		expect(response.status).toBe(400);
	});

	it('should not edit description of given list name due to missing existence of name field', async () => {
		const response = await request(app).put('/editDescriptionOfShoppingLists').send({
			description: 'Electronics Description',
		});

		expect(response.status).toBe(400);
	});

	it('should edit description of given list name', async () => {
		const response = await request(app).put('/editDescriptionOfShoppingLists').send({
			name: listData[0].name,
			description: 'Electronics Description',
		});

		expect(response.status).toBe(200);
	});

	it('should not edit description of given list name due to missing existence of given name', async () => {
		const response = await request(app).put('/editDescriptionOfShoppingLists').send({
			name: 'NonExistentName',
			description: 'Electronics Description',
		});

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		await fs.promises.writeFile(
			config.listFilePath,
			JSON.stringify({ shoppingLists: [] }, null, 2),
		);
	});
});

describe('PUT /addItemsToExistingListByName', () => {
	beforeAll(async () => {
		config.shoppingArticles.shoppingArticles = [];

		//create a json object
		config.shoppingArticles.shoppingArticles = [
			{ name: 'Article 34', description: 'Another description', amount: 5 },
			{ name: 'Article 35', description: 'Another description', amount: 5 },
		];

		config.shoppingLists.shoppingLists = [...listData];

		//initialiyte the json file
		await fs.writeFile(
			config.articleFilePath,
			JSON.stringify(config.shoppingArticles, null, 2),
			() => {},
		);
		await fs.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
			() => {},
		);
	});

	it('should not add articles to existing name due to missing existence of listname field ', async () => {
		const response = await request(app).put('/addItemsToExistingListByName').send({
			articles: config.shoppingArticles.shoppingArticles[0],
		});

		expect(response.status).toBe(400);
	});

	it('should not add articles to existing name due to empty insertion of listname field ', async () => {
		const response = await request(app).put('/addItemsToExistingListByName').send({
			listName: '',
			articles: config.shoppingArticles.shoppingArticles[0],
		});

		expect(response.status).toBe(400);
	});

	it('should not add articles to existing name due to missing existence of list ', async () => {
		const response = await request(app).put('/addItemsToExistingListByName').send({
			listName: 'NonExistentName',
			articles: config.shoppingArticles.shoppingArticles[0],
		});

		expect(response.status).toBe(404);
	});

	it('should add articles to existing name', async () => {
		const response = await request(app).put('/addItemsToExistingListByName').send({
			listName: listData[0].name,
			articles: config.shoppingArticles.shoppingArticles[0],
		});

		expect(response.status).toBe(200);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(
			config.articleFilePath,
			JSON.stringify({ shoppingArticles: [] }, null, 2),
			() => {},
		);
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});
