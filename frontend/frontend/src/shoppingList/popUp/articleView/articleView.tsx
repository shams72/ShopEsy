import React from "react";
import { Article, ShoppingList } from "../../../types/types";
import ArticleViewForm from "./form/articleViewForm";
import DeleteButton from "./buttonView/deleteButton";

interface ArticleView {
  currentListItems: Article[] | undefined;
  currentList: ShoppingList | undefined;
}

//component to view the contents of a given list
const ArticleView: React.FC<ArticleView> = ({
  currentList,
  currentListItems,
}) => {
  

  return (
    <div>
      <div className="table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">Name</div>
            <div className="table-cell">Description</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>
        <div className="table-body">
          {currentListItems?.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{item.name}</div>
              <div className="table-cell">{item.description}</div>
              <div className="table-cell">{item.amount}</div>
              <div className="table-cell arrangeActions">
                {item.name && <ArticleViewForm name={item.name} />}
                {currentList?.name && item.name && item.amount && (
                  <DeleteButton
                    listName={currentList.name}
                    articleName={item.name}
                    amount={item.amount}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
