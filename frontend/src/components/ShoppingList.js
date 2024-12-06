import React, { useState } from 'react';
import axios from 'axios';

function ShoppingList({ setSelectedShoppingList }) {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');

  const addItem = () => {
    setItems([...items, { name: itemName }]);
    setItemName('');
  };

  const submitList = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/shoppingLists', {
        items,
        userLocation: location
      });
      setSelectedShoppingList(response.data);
    } catch (error) {
      console.error('Error submitting shopping list:', error);
    }
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <input
        type="text"
        placeholder="Add an item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <input
        type="text"
        placeholder="Your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={submitList}>Submit List</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
