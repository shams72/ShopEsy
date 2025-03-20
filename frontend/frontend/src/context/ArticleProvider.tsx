import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the Article type
interface Article {
  name: string;
  description: string;
  amount: number;
}

type ArticlesContextType = {
  articles: Article[];
  updateArticles: (
    quantity: number,
    operation: "increase" | "decrease"
  ) => void;
  addNewArticles: (article: Article) => void;
  updateDeleteArticles: (articleName: string) => void;
  deleteAllArticles: () => void;
  editAmountOfArticles: (articleName: string, newAmount: number) => void;
  editDescriptionOfArticles: (
    articleName: string,
    newDescription: string
  ) => void;
  editNameOfArticles: (oldName: string, newName: string) => void;
  editAmountOfArticlesOnAddition: (
    articleName: string,
    newAmount: number
  ) => void;
  editAmountOfArticlesfromListonDeletion: (
    articleName: string,
    newAmount: number
  ) => void;
};

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

interface ArticlesProviderProps {
  children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  //fetch all the list data in load using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/getAllShoppingArticles");
        const result = await response.json();

        if (result.data && result.data.shoppingArticles) {
          setArticles(result.data.shoppingArticles);
        } else {
          console.error("Unexpected response structure:", result);
          setArticles([]);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      }
    };

    fetchData();
  }, []);
  
  //updateArticles in the list based on increase or decrease inpout
  const updateArticles = (
    quantity: number,
    operation: "increase" | "decrease"
  ) => {
    setArticles((prevArticles) => //uses setarticle to set the latests of the articles
      prevArticles.map((article) => {
        if (operation === "increase") {
          return { ...article, amount: article.amount + quantity };
        } else if (operation === "decrease") {
          return { ...article, amount: Math.max(0, article.amount - quantity) };
        }
        return article;
      })
    );
  };

  const addNewArticles = (article: Article) => {
    setArticles((prevArticles) => [...prevArticles, article]);
  };
  
  //edit the name of articles
  const editNameOfArticles = (
    oldArticleName: string,
    newArticleName: string
  ) => {
    setArticles((articles) =>
      articles.map((article) => //check if article with the name exsists
        article.name === oldArticleName           
          ? { ...article, name: newArticleName }
          : article
      )
    );
  };

  //edit the description of articles 
  const editDescriptionOfArticles = (
    articleName: string,
    newArticleDesc: string
  ) => {
    setArticles((articles) =>
      articles.map((article) =>
        article.name === articleName  //check if article with the name exsists
          ? { ...article, description: newArticleDesc }
          : article
      )
    );
  };
  
  //edit artcile amount
  const editAmountOfArticles = (
    articleName: string,
    newArticleAmount: number
  ) => {
    setArticles((articles) =>
      articles.map((article) =>
        article.name === articleName //check if article with the name exsists
          ? { ...article, amount: newArticleAmount }
          : article
      )
    );
  };

  //update amount of articles on inaerting in a list
  const editAmountOfArticlesOnAddition = (
    articleName: string,
    newAmount: number
  ) => {
    setArticles((articles) =>
      articles.map((article) =>
        article.name === articleName //check if article with the name exsists
          ? { ...article, amount: article.amount - newAmount }
          : article
      )
    );
  };
  
  
  //update amount of articles on deeltion from a list
  const editAmountOfArticlesfromListonDeletion = (
    articleName: string,
    newAmount: number
  ) => {
    setArticles((articles) =>
      articles.map((article) =>
        article.name === articleName      //update amount of articles on inaerting in a list
          ? { ...article, amount: Math.max(0, article.amount + newAmount) }
          : article
      )
    );
  };

  //update articles on deleltion
  const updateDeleteArticles = (articleName: string) => {
    setArticles((previousArticles) =>    
      previousArticles.filter((a) => a.name !== articleName)
    );
  };
   
  //deleelte articles on deleltion
  const deleteAllArticles = () => {
    setArticles([]);
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        updateArticles,
        addNewArticles,
        updateDeleteArticles,
        deleteAllArticles,
        editAmountOfArticles,
        editDescriptionOfArticles,
        editNameOfArticles,
        editAmountOfArticlesfromListonDeletion,
        editAmountOfArticlesOnAddition,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
