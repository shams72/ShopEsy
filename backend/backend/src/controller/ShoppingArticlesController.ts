import { Request, Response } from 'express';
import fs from 'fs';
import config from '../../config';
import {
	ShoppingArticle,
	RequestedNameChange,
	RequestedDescriptionChange,
	RequestedAmountChange,
} from './types/article-types';
import { writeFile } from './types/writefile';

const shoppingArticles = config.shoppingArticles; //sets the json articles based on environment variable for more info check config.ts
const shoppingLists = config.shoppingLists; //sets the json list based on environment variable for more info check config.ts

class ShoppingArticlesController {
	static getAllShoppingArticles = (req: Request, res: Response) => {
		res.contentType('application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200).json({ data: shoppingArticles });
	};

	static createShoppingArticles = (req: Request, res: Response) => {
		const requestedShoppingArticle: ShoppingArticle = req.body;

		const found = shoppingArticles.shoppingArticles.find(
			(article) => article.name === requestedShoppingArticle.name,
		);
		//check if artticle exists
		if (found) {
			return res.status(409).json({
				name: requestedShoppingArticle.name,
				message: 'Article already exists',
			});
		}

		const newArticle: ShoppingArticle = {
			name: requestedShoppingArticle.name,
			description: requestedShoppingArticle.description,
			amount: requestedShoppingArticle.amount,
		};

		shoppingArticles.shoppingArticles.push(newArticle);
		//if article exists write in file
		fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: 'Failed to save data' });
			}
			return res.status(200).json({
				message: 'Article added successfully',
				data: newArticle,
			});
		});
	};

	static editNameofArticles = (req: Request, res: Response) => {
		const requestedChanges: RequestedNameChange = req.body;

		//check if article already exists
		const nameExistence = shoppingArticles.shoppingArticles.find(
			(article) => article.name === requestedChanges.name,
		);
		//check if requested changed name exists
		const newNameExistence = shoppingArticles.shoppingArticles.find(
			(article) => article.name === requestedChanges.newName,
		);
		//if article doesnot existence
		if (!nameExistence) {
			return res.status(404).json({
				message: 'Name Doesnot Exist',
			});
		} else if (newNameExistence) {
			return res.status(409).json({
				message: 'Name already Exists',
			});
			//if newArticle name doesnot exist and the article exists
		} else if (nameExistence && !newNameExistence && requestedChanges.newName.trim() !== '') {
			const oldName = nameExistence.name;
			nameExistence.name = requestedChanges.newName;
			for (let i = 0; i < shoppingLists.shoppingLists.length; i++) {
				const items = shoppingLists.shoppingLists[i]?.items;

				// Ensure items is an array before iterating
				if (Array.isArray(items)) {
					for (let j = 0; j < items.length; j++) {
						if (items[j].name === oldName) {
							items[j].name = requestedChanges.newName; // Update the name
						}
					}
				}
			}
		}

		//if article exissts write in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		]).then(() => {
			return res.status(200).json({
				message: 'Selected articles were changed',
				data: requestedChanges,
			});
		});
	};

	static editDescriptionofArticles = (req: Request, res: Response) => {
		const requestedChanges: RequestedDescriptionChange = req.body;

		//check if article from parameter exists
		const nameExistence = shoppingArticles.shoppingArticles.find(
			(article) => article.name === requestedChanges.name,
		);

		//if article exists and description is not empty
		if (nameExistence) {
			nameExistence.description = requestedChanges.description;
			for (let i = 0; i < shoppingLists.shoppingLists.length; i++) {
				for (let j = 0; j < shoppingLists.shoppingLists[i].items.length; j++) {
					if (shoppingLists.shoppingLists[i].items[j].name === nameExistence.name) {
						shoppingLists.shoppingLists[i].items[j].description =
							requestedChanges.description;
					}
				}
			}
			//if article false artcicles are given
		} else if (!nameExistence) {
			return res.status(404).json({
				message: 'Article with this Name doesnot exist',
				data: requestedChanges,
			});
		}

		//if parameter exists then change the name and stre in file
		Promise.all([
			writeFile(config.articleFilePath, shoppingArticles),
			writeFile(config.listFilePath, shoppingLists),
		]).then(() => {
			return res.status(200).json({
				message: 'Selected articles were changed',
				data: requestedChanges,
			});
		});
	};

	static adjustAmountByName = (req: Request, res: Response) => {
		const requestedChanges: RequestedAmountChange = req.body;

		const nameExistence = shoppingArticles.shoppingArticles.find(
			(article) => article.name === requestedChanges.name,
		);
		if (nameExistence) {
			nameExistence.amount = requestedChanges.amount;
		} //if requested objects are wrongly entered
		else {
			return res.status(404).json({
				name: requestedChanges.name,
				message: 'Articles doesnot exist',
			});
		}

		//if article exists write changes in the file
		fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: 'Failed to save data' });
			}
			return res.status(200).json({
				message: "Articles doesn't exist",
				data: requestedChanges,
			});
		});
	};

	static increaseAllArticles = (req: Request, res: Response) => {
		const increaseAmount: number = req.body.increaseAmount;
		//check increase amount number

		for (let i = 0; i < shoppingArticles.shoppingArticles.length; i++) {
			shoppingArticles.shoppingArticles[i].amount += increaseAmount;
		}
		//if increase amount is valid then save in file
		fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: err });
			} else {
				return res.status(200).json({
					message: 'All Articles were increased by ' + increaseAmount,
				});
			}
		});
	};

	static decreaseAllArticles = (req: Request, res: Response) => {
		const decreaseAmount: number = req.body.decreaseAmount;
		//check decrease amount

		for (let i = 0; i < shoppingArticles.shoppingArticles.length; i++) {
			const currentAmount = Number(shoppingArticles.shoppingArticles[i].amount);
			const reducedAmount = currentAmount - decreaseAmount;
			if (reducedAmount >= 0) {
				shoppingArticles.shoppingArticles[i].amount = reducedAmount;
			} else {
				shoppingArticles.shoppingArticles[i].amount = 0;
			}
		}
		//if decreased write in file
		fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
			if (err) {
				res.status(500).json({ error: err });
			}
			return res.status(200).json({
				message: 'All Articles were decreased by ' + decreaseAmount,
			});
		});
	};

	static deleteArticlesByName = (req: Request, res: Response) => {
		const articleName: string = req.body.name;
	
		//find the index of article for slicing(deleting)
		const indexArticle = shoppingArticles.shoppingArticles
			.map(function (item) {
				return item.name;
			})
			.indexOf(articleName);

		if (indexArticle === -1) {
			return res.status(404).json({
				message: 'Article Doesnot Exist',
			});
		} else {
			//apply slicing
			shoppingArticles.shoppingArticles.splice(indexArticle, 1);
		}
		//write chnages in file
		fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: err });
			} else {
				return res.status(200).json({
					message: 'Articles Deleted',
					data: articleName,
				});
			}
		});
	};

	static deleteAllArticles = (req: Request, res: Response) => {
		if (shoppingArticles.shoppingArticles.length > 0) {
			//delete the shopping article
			shoppingArticles.shoppingArticles = [];
			//write changes in file
			fs.writeFile(config.articleFilePath, JSON.stringify(shoppingArticles, null, 2), (err) => {
				if (err) {
					return res.status(500).json({ error: err.message });
				} else {
					return res.status(200).json({
						message: 'All articles have been deleted.',
					});
				}
			});
		} else if (shoppingArticles.shoppingArticles.length === 0) {
			return res.status(404).json({
				message: 'There are no articles to delete.',
			});
		}
	};
}

export default ShoppingArticlesController;
