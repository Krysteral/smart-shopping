import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList'; // Import ProductList component
import ShoppingListList from './components/ShoppingListList'; // Import ShoppingListList component

function App() {
  return (
    <div>
      <h1>Smart Shopping</h1>
      <ToastContainer /> {/* Toast notifications */}
      <ProductList /> {/* Displays and manages products */}
      <ShoppingListList /> {/* Displays and manages shopping lists */}
    </div>
  );
}

export default App;
