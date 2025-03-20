import { Request, Response } from 'express';
import fs from 'fs';
import config from '../../config';
import * as dotenv from 'dotenv';
import { writeFile } from './types/writefile';
import {
	ShoppingList,
	ShoppingListItem,
	requestedList,
	RequestedShoppingListChange,
	RequestedDescriptionChange,
	RequestedArticles,
	DeleteArticleRequest,
	searchData,
	RequestedAmountChange,
} from './types/list-types';

const shoppingArticles = config.shoppingArticles; //sets the json articles based on environment variable for more info check config.ts
const shoppingLists = config.shoppingLists; //sets the json list based on environment variable for more info check config.ts
const apiKey = process.env.API_KEY;

dotenv.config();

class ShoppingListsController {
	static getAllLists = (req: Request, res: Response) => {
		//get all lists
		res.status(200).json({
			data: shoppingLists,
		});
	};

	static getListsByName = (req: Request, res: Response) => {
		const listName: string = req.params.names;

		const list = shoppingLists.shoppingLists.find((list) => list.name === listName);
		//if list is found
		if (list) {
			return res.status(200).json({
				message: 'List with the given name found',
				data: list,
			});
		}

		return res.status(404).json({
			message: 'List with the given name not found',
		});
	};

	static getShoppingListsByNameofArticle = (req: Request, res: Response) => {
		const articleName: string = req.params.names;
		//check if correct request parameters are given

		const existingList: string[] = [];
		//save the list with the given name in array
		for (let i = 0; i < shoppingLists.shoppingLists.length; i++) {
			const shoppingList = shoppingLists.shoppingLists[i];
			// Check if 'items' is defined and is an array
			if (Array.isArray(shoppingList.items)) {
				// Iterate over all items in the shopping list
				for (let j = 0; j < shoppingList.items.length; j++) {
					if (shoppingList.items[j].name === articleName) {
						existingList.push(shoppingList.name);
						break; // Stop checking further items once a match is found
					}
				}
			}
		}
		//reply with 200 if it exists
		if (existingList.length > 0) {
			return res.status(200).json({
				message: 'The requested article was found in these lists:',
				data: existingList,
			});
		} else if (existingList.length === 0) {
			return res.status(404).json({
				message: 'The requested article does not exist in any lists',
			});
		}
	};

	static createShoppingLists = (req: Request, res: Response) => {
		const requestedLists: requestedList = req.body;
		let added: ShoppingList;

		//check if shopping list with name exists
		const found: string = shoppingLists.shoppingLists.find(
			(article) => article.name === requestedLists.name,
		);

		if (found) {
			return res.status(409).json({
				name: requestedLists.name,
				reason: 'List Already Exists',
			});
		}
		//if not found create the object
		if (!found) {
			const newArticle = {
				name: requestedLists.name,
				description: requestedLists?.description,
				creationDate: new Date().toISOString(),
				items: requestedLists.item,
			};
			shoppingLists.shoppingLists.push(newArticle);
			added = newArticle;
		}
		//write the chnages in file
		fs.writeFile(config.listFilePath, JSON.stringify(shoppingLists, null, 2), (err) => {
			if (err) {
				res.status(500).json({ error: err });
			}

			res.status(200).json({
				message: 'All Articles Added',
				data: added,
			});
		});
	};

	static editNameOfShoppingLists = (req: Request, res: Response) => {
		const requestedChanges: RequestedShoppingListChange = req.body;

		//chek if list name exists
		const nameExistence = shoppingLists.shoppingLists.find(
			(article) => article.name === requestedChanges.name,
		);
		//check if requested name to change exists
		const newNameExistence = shoppingLists.shoppingLists.find(
			(article) => article.name === requestedChanges.newName,
		);

		//if requested name doesnot exists
		if (nameExistence && !newNameExistence && requestedChanges.newName.trim() != '') {
			nameExistence.name = requestedChanges.newName;
		} else if (nameExistence && newNameExistence) {
			return res.status(409).json({
				message: 'List Already Exists',
			});
		} else if (!nameExistence) {
			return res.status(404).json({
				message: 'List Doesnot Exist',
			});
		}

		//writein file thechnages
		fs.writeFile(config.listFilePath, JSON.stringify(shoppingLists, null, 2), (err) => {
			if (err) {
				res.status(500).json({ error: err });
			}
			return res.status(200).json({
				message: 'List Name Changed',
				data: requestedChanges.newName,
			});
		});
	};

	static editDescriptionOfShoppingLists = (req: Request, res: Response) => {
		//check if correct request parameters are given
		const requestedChanges: RequestedDescriptionChange = req.body;

		const nameExistence = shoppingLists.shoppingLists.find(
			(article) => article.name === requestedChanges.name,
		);
		//if name exissts change description
		if (nameExistence) {
			nameExistence.description = requestedChanges.description;
		} else {
			return res.status(404).json({
				message: 'List doesnot exist',
			});
		}
		//write changes in file
		fs.writeFile(config.listFilePath, JSON.stringify(shoppingLists, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			return res.status(200).json({
				message: 'List Updated succesfully',
				data: requestedChanges.description,
			});
		});
	};

	static addArticlesToExistingListByName = (req: Request, res: Response) => {
		const list: RequestedArticles = req.body;

		const indexList = shoppingLists.shoppingLists.findIndex(
			(item) => item.name === list.listName,
		);
		//find article index
		if (indexList === -1) {
			return res.status(404).json({ message: 'List Doesnot exist' });
		}

		const articleToAdd = list.articles;
		//check for the articles index if it exists
		const shoppingList = shoppingLists.shoppingLists[indexList];
		const articleExists = shoppingList.items.some(
			(item: ShoppingListItem) => item.name === articleToAdd.name,
		);
		//if same article doesnot exist in list, save it in list
		if (!articleExists) {
			const findArticle = shoppingArticles.shoppingArticles.find(
				(item) => item.name === articleToAdd.name,
			);
			//if article found: algortihm to change amount in backend and frontnend
			if (findArticle) {
				findArticle.amount = findArticle.amount - articleToAdd.amount;
				if (findArticle.amount < 0) {
					const oldAmount = findArticle.amount;
					findArticle.amount = 0;
					articleToAdd.amount += oldAmount;
				}
				shoppingList.items.push(articleToAdd);
			}
		} else {
			res.status(409).json({
				message: 'Article Already exists in List',
			});
		}
		//write changes in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		])
			.then(() => {
				return res.status(200).json({
					message: 'Articles were added',
					data: list.articles,
				});
			})
			.catch((err) => {
				console.error(err);
				res.status(500).json({
					error: 'An error occurred while writing files.',
				});
			});
	};

	static deleteArticleInListByName = (req: Request, res: Response) => {
		const request: DeleteArticleRequest = req.body;

		//check if listname exists
		const list = shoppingLists.shoppingLists.find((list) => list.name === request.listName);
		if (!list) {
			return res.status(404).json({ message: 'List Doesnot Exist' });
		}
		//find article index
		const articleIndex = list.items.findIndex(
			(item: ShoppingListItem) => item.name === request.articleName,
		);
		//delete the article
		if (articleIndex != -1) {
			list.items.splice(articleIndex, 1);
			const article = shoppingArticles.shoppingArticles.find(
				(article) => article.name === request.articleName,
			);
			if (article) {
				article.amount += request.amount;
			}
		} else if (articleIndex === -1) {
			return res.status(404).json({ message: 'Article Doesnot Exist' });
		}
		//write in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		])
			.then(() => {
				return res.status(200).json({
					message: 'Articles were deleted',
				});
			})
			.catch((err) => {
				return res.status(500).json({
					error: 'Failed to write to files.',
					details: err,
				});
			});
	};

	static deleteListsByName = (req: Request, res: Response) => {
		const listNames: string = req.body.name;

		//find the listindex
		const indexList = shoppingLists.shoppingLists
			.map(function (item) {
				return item.name;
			})
			.indexOf(listNames);
		//if index exisits then delete it
		if (indexList === -1) {
			return res.status(404).json({ message: 'List doesnot exist' });
		} else {
			shoppingLists.shoppingLists.splice(indexList, 1);
		}
		//write in file
		fs.writeFile(config.listFilePath, JSON.stringify(shoppingLists, null, 2), (err) => {
			if (err) {
				res.status(500).json({ error: err });
			}
			return res.status(200).json({
				message: 'Selected Lists were Deleted',
			});
		});
	};

	static searchWithBrave = async (req: Request, res: Response) => {
		const searchQuery: string = req.params.names;

		const searchData: searchData[] = [];

		try {
			//send reuest to api
			const response = await fetch(
				`https://api.search.brave.com/res/v1/web/search?q=buy${searchQuery}online&country=DE`,
				{
					headers: {
						Accept: 'application/json',
						'Accept-Encoding': 'gzip',
						'X-Subscription-Token': apiKey,
						'X-Loc-Country': 'DE',
					},
				},
			);

			const data = await response.json();

			for (let i = 0; i < data.web.results.length; i++) {
				searchData.push({
					title: data.web.results[i].title,
					url: data.web.results[i].url,
				});
			}

			//respond with status 200 after search results
			return res.status(200).json({
				message: 'search data',
				data: searchData,
			});
		} catch (error) {
			console.error('Error fetching data from Brave API:', error);
			return res.status(500).json({
				error: 'Failed to fetch data from Brave API',
			});
		}
	};

	static adjustArticleAmountInListByName = (req: Request, res: Response) => {
		const listName: RequestedAmountChange = req.body;

		//find the listname
		const list = shoppingLists.shoppingLists.find((l) => l.name === listName.listName);
		if (!list) {
			return res.status(404).json({ message: 'List does not exist' });
		}
		//find article existence from the given listname
		const article = list.items.find(
			(item: ShoppingListItem) => item.name === listName.articleName,
		);
		if (!article) {
			return res.status(404).json({
				message: 'Article does not exist in the list',
			});
		}
		//check if article exists in shopping article json file
		const shoppingArticle = shoppingArticles.shoppingArticles.find(
			(a) => a.name === listName.articleName,
		);
		if (!shoppingArticle) {
			return res.status(404).json({
				message: 'Article does not exist in the main shopping articles',
			});
		}

		//algortihm to adjust article amount after changing amount of an exisiting article through shoppingList
		const requestedAmount = listName.amount;
		if (shoppingArticle.amount >= requestedAmount) {
			shoppingArticle.amount += article.amount;
			shoppingArticle.amount -= requestedAmount;
			article.amount = requestedAmount;
		} else {
			article.amount += shoppingArticle.amount;
			shoppingArticle.amount = 0;
		}

		const listAmount = article.amount;
		const articleAmount = shoppingArticle.amount;

		//write chnages in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		])
			.then(() => {
				return res.status(200).json({
					message: 'Article adjusted successfully',
					listAmountData: listAmount,
					articleAmountData: articleAmount,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					error: 'Failed to write to files.',
					details: err,
				});
			});
	};

	static deleteAllItemsInListByName = (req: Request, res: Response) => {
		const listNames: string = req.body.name;
		const editedArticles: {
			articleName: string;
			articleAmount: number;
		}[] = [];
		//check if correct request parameters are given
		if (!listNames || listNames.trim() === '') {
			return res.status(400).json({
				message: 'List Name/Field cannot be empty',
			});
		}

		//find te list name
		const list = shoppingLists.shoppingLists.find((list) => list.name === listNames);
		//if list exists
		if (list) {
			const listItems = list.items;
			for (let j = 0; j < listItems.length; j++) {
				const article = shoppingArticles.shoppingArticles.find(
					(article) => article.name === listItems[j].name,
				);
				if (article) {
					article.amount += listItems[j].amount;
					editedArticles.push({
						articleName: article.name,
						articleAmount: article.amount,
					});
				} else {
					continue;
				}
			}
			list.items = [];
		} else {
			return res.status(404).json({ message: 'List Name doesnot exist' });
		}
		//write chanegs in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		])
			.then(() => {
				return res.status(200).json({
					message: 'List Items Deleted',
					articles: editedArticles,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					error: 'Failed to write to files.',
					details: err,
				});
			});
	};

	static deleteAllLists = (req: Request, res: Response) => {
		if (shoppingLists.shoppingLists.length > 0) {
			//delete all the lists
			shoppingLists.shoppingLists = [];
			//write changes in file
			fs.writeFile(config.listFilePath, JSON.stringify(shoppingLists, null, 2), (err) => {
				if (err) {
					res.status(500).json({
						error: err.message,
					});
				} else {
					res.status(200).json({
						message: 'All lists have been deleted.',
					});
				}
			});
		} else if (shoppingLists.shoppingLists.length === 0) {
			res.status(404).json({
				message: 'There are no lists to delete.',
			});
		}
	};

	static getShoppingListByDescription = (req: Request, res: Response) => {
		//find desription
		const listDescription: string = req.params.desc;
		const listNames: ShoppingList[] = [];
		//find lists with empty description
		if (listDescription === '""') {
			for (let i = 0; i < shoppingLists.shoppingLists.length; i++) {
				if (shoppingLists.shoppingLists[i].description === '') {
					listNames.push(shoppingLists.shoppingLists[i]);
				}
			}
		} else {
			for (let i = 0; i < shoppingLists.shoppingLists.length; i++) {
				if (shoppingLists.shoppingLists[i].description === listDescription) {
					listNames.push(shoppingLists.shoppingLists[i]);
				}
			}
		}
		//returnn 200 if description matches
		if (listNames.length > 0) {
			res.status(200).json({
				message: 'The followingLists matches the description',
				data: listNames,
			});
		} else {
			res.status(404).json({
				message: 'Lists with this description doesnot exist',
				data: listDescription,
			});
		}
	};
}

export default ShoppingListsController;
