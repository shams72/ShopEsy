import request from 'supertest';
import app from '../src/app';
import config from '../config';
import fs from 'fs';
import listData from './testJSON/testListData.json';

describe('POST /createShoppingList', () => {
	beforeAll(async () => {
		//initialiyte the json file with empty file
		await fs.writeFile(
			config.listFilePath,
			JSON.stringify({ shoppingLists: [] }, null, 2),
			() => {},
		);
	});

	it('it should add a list name due to missign insertion of name field', async () => {
		const response = await request(app).post('/createShoppingList').send({});

		expect(response.status).toBe(400);
	});

	it('it should add a list name due to empty insertion of name field', async () => {
		const response = await request(app).post('/createShoppingList').send(listData[2]);

		expect(response.status).toBe(400);
	});

	it('it should add a list name', async () => {
		const response = await request(app).post('/createShoppingList').send(listData[0]);

		expect(response.status).toBe(200);
	});

	it('should not insert the second list since it is doesnot have a distinct name', async () => {
		const response = await request(app).post('/createShoppingList').send(listData[0]);

		expect(response.status).toBe(409);
	});
});
