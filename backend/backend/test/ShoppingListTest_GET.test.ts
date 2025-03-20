import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';
import listData from './testJSON/testListData.json'

describe('GET /getAllShoppingArticles', () => {
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

	it('it should get all the shopping Lists', async () => {
		const response = await request(app).get('/getAllShoppingList');

		expect(response.status).toBe(200);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('GET /getShoppingListByName/:names', () => {
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

	it('it should not get the shopping Lists due to insertion of more than 15 characters', async () => {
		const response = await request(app).get('/getShoppingListByName/aaaaaaaaaaaaaaaa');

		expect(response.status).toBe(400);
	});

	it('it should get the shopping Lists by name', async () => {
		const response = await request(app).get('/getShoppingListByName/Sample%20List%201');

		expect(response.status).toBe(200);
	});

	it('it should not get the shopping Lists because of missing existence of the name', async () => {
		const response = await request(app).get('/getShoppingListByName/Sample%20List');

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('GET /getShoppingListsByNameOfArticle/:names', () => {
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

	it('it should not get the shopping Lists due to insertion of more than 15 characters', async () => {
		const response = await request(app).get('/getShoppingListByName/aaaaaaaaaaaaaaaa');

		expect(response.status).toBe(400);
	});

	it('it should give List names which contains the article', async () => {
		const response = await request(app).get('/getShoppingListsByNameOfArticle/4K%20TV');

		expect(response.status).toBe(200);
	});

	it('it should not give the List name because the article doesnot exist', async () => {
		const response = await request(app).get('/getShoppingListsByNameOfArticle/Apple');

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('GET /resultsFromTheWeb/:name', () => {
	it('it should give the urls', async () => {
		const response = await request(app).get('/resultsFromTheWeb/sugar');

		expect(response.status).toBe(200);
	});
	it('it should not give the urls due to exceeding word limits', async () => {
		const response = await request(app).get('/resultsFromTheWeb/sugarsugarsugarsugar');

		expect(response.status).toBe(400);
	});
});

describe('GET /getShoppingListByDescription/:desc', () => {
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

	it('it should give List names which contains the given description', async () => {
		const response = await request(app).get(
			'/getShoppingListByDescription/Electronics%20and%20essentials.',
		);

		expect(response.status).toBe(200);
	});

	it('it should not give the List name because the article doesnot doesnot exist', async () => {
		const response = await request(app).get('/getShoppingListsByNameOfArticle/Apple');

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});
