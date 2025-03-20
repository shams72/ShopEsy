import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';
import listData from './testJSON/testListData.json';

describe('DELETE /deleteAllItemsInListByName', () => {
	beforeAll(async () => {
		//create a json object
		config.shoppingLists.shoppingLists = [...listData];
		//initialiyte the json file

		await fs.promises.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
		);
	});

	it('should not delete all items in list due to missing existence of name field ', async () => {
		const response = await request(app).delete('/deleteAllItemsInListByName').send({});

		expect(response.status).toBe(400);
	});

	it('should not delete all items in list due to passing of empty list', async () => {
		const response = await request(app).delete('/deleteAllItemsInListByName').send({ name: '' });

		expect(response.status).toBe(400);
	});

	it('should delete all items in list by name', async () => {
		const response = await request(app)
			.delete('/deleteAllItemsInListByName')
			.send({ name: 'Sample List 2' });

		expect(response.status).toBe(200);
	});

	it('should not delete list items because list does not exist', async () => {
		const response = await request(app)
			.delete('/deleteAllItemsInListByName')
			.send({ name: 'Sample List 6' });

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

describe('DELETE /deleteArticleInListByName', () => {
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

	it('should delete articles to empty insertion of list name', async () => {
		const response = await request(app).delete('/deleteArticleInListByName').send({
			listName: listData[2].name,
			articleName: listData[0].items[0].name,
			amount: 20,
		});

		expect(response.status).toBe(400);
	});

	it('should delete articles to empty insertion of list name field', async () => {
		const response = await request(app).delete('/deleteArticleInListByName').send({
			articleName: listData[0].items[0].name,
			amount: 20,
		});

		expect(response.status).toBe(400);
	});

	it('should delete articles to given list name', async () => {
		const response = await request(app).delete('/deleteArticleInListByName').send({
			listName: listData[0].name,
			articleName: listData[0].items[0].name,
			amount: 20,
		});

		expect(response.status).toBe(200);
	});

	it('should not delete articles to given list name due to missing existence of list ', async () => {
		const response = await request(app).delete('/deleteArticleInListByName').send({
			listName: 'Example list name',
			articleName: listData[0].items[0].name,
			amount: 20,
		});

		expect(response.status).toBe(404);
	});

	it('should not add articles to given list name due to missing existence of articles ', async () => {
		const response = await request(app).delete('/deleteArticleInListByName').send({
			listName: listData[0].name,
			articleName: 'Article 12',
			amount: listData[0].items[0].amount,
		});

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

describe('DELETE /deleteListsByName', () => {
	beforeAll(async () => {
		//create a json object
		config.shoppingLists.shoppingLists = [...listData];

		//initialiyte the json file
		await fs.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
			() => {},
		);
	});

	it('should not delete given list name due to empty entry of listname', async () => {
		const response = await request(app)
			.delete('/deleteListsByName')
			.send({ name: listData[2].name });

		expect(response.status).toBe(400);
	});

	it('should delete given list name due to missing existence of listname field', async () => {
		const response = await request(app).delete('/deleteListsByName').send({});

		expect(response.status).toBe(400);
	});

	it('should delete given list name', async () => {
		const response = await request(app)
			.delete('/deleteListsByName')
			.send({ name: listData[0].name });

		expect(response.status).toBe(200);
	});

	it('should not given list name due to missing existence of list name ', async () => {
		const response = await request(app)
			.delete('/deleteListsByName')
			.send({ name: 'Example list name' });

		expect(response.status).toBe(404);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});

describe('DELETE /deleteAllLists', () => {
	beforeAll(async () => {
		//create a json object
		config.shoppingLists.shoppingLists = [...listData];
		//initialiyte the json file
		await fs.writeFile(
			config.listFilePath,
			JSON.stringify(config.shoppingLists, null, 2),
			() => {},
		);
	});

	it('should delete all the lists', async () => {
		const response = await request(app).delete('/deleteAllLists');
		expect(response.status).toBe(200);
	});

	afterAll(async () => {
		//rollback to initial state
		fs.writeFile(config.listFilePath, JSON.stringify({ shoppingLists: [] }, null, 2), () => {});
	});
});
