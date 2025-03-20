interface ListItem {
	name: string;
	description: string;
	amount: number;
}

export interface ShoppingList {
	name: string;
	description: string;
	creationDate: string;
	items: ListItem[];
}

export interface ShoppingListItem {
	name: string;
	description: string;
	amount: number;
}

export interface requestedList {
	name: string;
	description?: string;
	item: [];
}

export interface RequestedShoppingListChange {
	name: string;
	newName: string;
}

export interface RequestedDescriptionChange {
	name: string;
	description: string;
}

export interface RequestedArticles {
	listName: string;
	articles: ListItem;
}

export interface DeleteArticleRequest {
	listName: string;
	articleName: string;
	amount: number;
}

export interface searchData {
	title: string;
	url: string;
}

export interface RequestedAmountChange {
	listName: string;
	articleName: string;
	amount: number;
}
