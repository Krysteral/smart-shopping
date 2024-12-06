import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList';
import ShoppingList from './components/ShoppingList';
import NearbyStores from './components/NearbyStores';
import ProductMatching from './components/ProductMatching';

function App() {
  const [selectedShoppingList, setSelectedShoppingList] = useState(null);

  return (
    <div>
      <h1>Smart Shopping</h1>
      <ToastContainer />
      <NearbyStores />
      <ShoppingList setSelectedShoppingList={setSelectedShoppingList} />
      {selectedShoppingList && <ProductMatching shoppingList={selectedShoppingList} />}
      <ProductList />
    </div>
  );
}

export default App;
