import express from 'express';
import ShoppingListsController from '../controller/ShoppingListsController';
import { validateNameParam } from '../middlewares/shoppingList/GETlistNameValidators';
import { validateCreateShoppingList } from '../middlewares/shoppingList/POSTListNameValidators';
import { validateEditNameList } from '../middlewares/shoppingList/PUTListNameValidators';
import { validateDescriptionChangeShoppingList } from '../middlewares/shoppingList/PUTListDescriptionValidators';
import { validateListArticleAddition } from '../middlewares/shoppingList/PUTListArticleAddition';
import { adjutListArticleInRequest } from '../middlewares/shoppingList/AdjustListArticleCheck';
import {validateDeleteListNameParam} from '../middlewares/shoppingList/DELTEListsByNameValidator';

const router = express.Router();

router.get(
	'/getAllShoppingList',
	ShoppingListsController.getAllLists.bind(ShoppingListsController),
);
router.get(
	'/getShoppingListByName/:names',validateNameParam,
	ShoppingListsController.getListsByName.bind(ShoppingListsController),
);
router.get(
	'/getShoppingListsByNameOfArticle/:names',validateNameParam,
	ShoppingListsController.getShoppingListsByNameofArticle.bind(ShoppingListsController),
);
router.get(
	'/resultsFromTheWeb/:names',validateNameParam,
	ShoppingListsController.searchWithBrave.bind(ShoppingListsController),
);
router.post(
	'/createShoppingList',validateCreateShoppingList,
	ShoppingListsController.createShoppingLists.bind(ShoppingListsController),
);
router.put(
	'/editNameOfShoppingLists', validateEditNameList,
	ShoppingListsController.editNameOfShoppingLists.bind(ShoppingListsController),
);
router.put(
	'/editDescriptionOfShoppingLists', validateDescriptionChangeShoppingList,
	ShoppingListsController.editDescriptionOfShoppingLists.bind(ShoppingListsController),
);
router.put(
	'/addItemsToExistingListByName', validateListArticleAddition,
	ShoppingListsController.addArticlesToExistingListByName.bind(ShoppingListsController),
);
router.delete(
	'/deleteArticleInListByName', adjutListArticleInRequest,
	ShoppingListsController.deleteArticleInListByName.bind(ShoppingListsController),
);
router.delete(
	'/deleteListsByName', validateDeleteListNameParam,
	ShoppingListsController.deleteListsByName.bind(ShoppingListsController),
);
router.put(
	'/adjustArticleAmountInListByName', adjutListArticleInRequest,
	ShoppingListsController.adjustArticleAmountInListByName.bind(ShoppingListsController),
);
router.delete(
	'/deleteAllItemsInListByName',
	ShoppingListsController.deleteAllItemsInListByName.bind(ShoppingListsController),
);
router.delete(
	'/deleteAllLists',
	ShoppingListsController.deleteAllLists.bind(ShoppingListsController),
);
router.get(
	'/getShoppingListByDescription/:desc',
	ShoppingListsController.getShoppingListByDescription.bind(ShoppingListsController),
);

export default router;
