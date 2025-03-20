import ShoppingArticles from './shoppingArticles/shoppingArticles';
import ShoppingList from './shoppingList/shoppingList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllList from './allList/allList';
import ListDetails from './allList/listDetails';
import React from "react";


const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<ShoppingList />} />
      <Route path="/shoppingArticles" element={<ShoppingArticles />} />
      <Route path="/all-lists" element={<AllList />} />
      <Route path="/details/:name" element={<ListDetails />} />
    </Routes>
  </Router>
  );
};

export default App;
