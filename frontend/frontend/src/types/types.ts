export interface Article {
  name?: string;
  description?: string;
  amount?: number;
}

export interface ShoppingList {
  name: string;
  description?: string;
  creationDate: string;
  items: Article[];
}
