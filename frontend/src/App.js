import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList'; // Import your ProductList component

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ProductList /> {/* Display ProductList component */}
    </div>
  );
}

export default App;
