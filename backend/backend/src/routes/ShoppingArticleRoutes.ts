import express from 'express';
import ShoppingArticlesController from '../controller/ShoppingArticlesController';
import { validateRequestedShoppingArticle } from '../middlewares/shoppingArticle/POSTArticleNameValidator';
import { validateEditNameList } from '../middlewares/shoppingArticle/PUTArticleNameEditValidator';
import { validateEditDescription } from '../middlewares/shoppingArticle/PUTArticleDescriptionValidator';
import { validateAdjustAmountByName } from '../middlewares/shoppingArticle/PUTArticleAmountChange';
import { validateAdjustAmount } from '../middlewares/shoppingArticle/PUTAllArticleAdjustmentNumber';
import { validateNameParam } from '../middlewares/shoppingArticle/DELETEArticleNameCheck';
const router = express.Router();

router.get(
	'/getAllShoppingArticles',
	ShoppingArticlesController.getAllShoppingArticles.bind(ShoppingArticlesController),
);
router.post(
	'/createShoppingArticle',
	validateRequestedShoppingArticle,
	ShoppingArticlesController.createShoppingArticles.bind(ShoppingArticlesController),
);
router.put(
	'/editNameOfArticles',
	validateEditNameList,
	ShoppingArticlesController.editNameofArticles.bind(ShoppingArticlesController),
);
router.put(
	'/editDescriptionOfArticles',
	validateEditDescription,
	ShoppingArticlesController.editDescriptionofArticles.bind(ShoppingArticlesController),
);
router.put(
	'/adjustAmountByName',
	validateAdjustAmountByName,
	ShoppingArticlesController.adjustAmountByName.bind(ShoppingArticlesController),
);
router.put(
	'/increaseAllArticles',
	validateAdjustAmount,
	ShoppingArticlesController.increaseAllArticles.bind(ShoppingArticlesController),
);
router.put(
	'/decreaseAllArticles',
	validateAdjustAmount,
	ShoppingArticlesController.decreaseAllArticles.bind(ShoppingArticlesController),
);
router.delete(
	'/deleteArticlesByName',
	validateNameParam,
	ShoppingArticlesController.deleteArticlesByName.bind(ShoppingArticlesController),
);
router.delete(
	'/deleteAllArticles',
	ShoppingArticlesController.deleteAllArticles.bind(ShoppingArticlesController),
);

export default router;
