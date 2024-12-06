import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function ShoppingList() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [listName, setListName] = useState('');
  const [items, setItems] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/shopping-lists`);
      setShoppingLists(response.data);
    } catch (error) {
      console.error("Error fetching shopping lists:", error);
    }
  };

  const handleCreateList = async () => {
    try {
      const newList = {
        name: listName,
        items: items.split(',').map((item) => item.trim()),
      };
      await axios.post(`${API_URL}/api/shopping-lists`, newList);
      fetchShoppingLists();
      setListName('');
      setItems('');
    } catch (error) {
      console.error("Error creating shopping list:", error);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/shopping-lists/${id}`);
      fetchShoppingLists();
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };

  return (
    <div>
      <h2>Shopping Lists</h2>
      <ul>
        {shoppingLists.map((list) => (
          <li key={list._id}>
            <strong>{list.name}</strong>
            <p>Items: {list.items.join(', ')}</p>
            <button onClick={() => setSelectedList(list)}>Edit</button>
            <button onClick={() => handleDeleteList(list._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>{selectedList ? 'Edit List' : 'Create New List'}</h3>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="List Name"
        />
        <textarea
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Comma-separated items (e.g., milk, bread, eggs)"
        />
        <button onClick={handleCreateList}>
          {selectedList ? 'Update List' : 'Create List'}
        </button>
      </div>
    </div>
  );
}

export default ShoppingList;
