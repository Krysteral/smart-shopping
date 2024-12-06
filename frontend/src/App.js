import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList'; // Import your ProductList component

function App() {
  return (
    <div>
      <h1>Smart Shopping</h1>
      <ProductList />
      <ShoppingListList />
    </div>
  );
}

export default App;
