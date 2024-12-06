import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL; // Backend URL from .env

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [shoppingLists, setShoppingLists] = useState([]);
  const [listName, setListName] = useState('');

  // Fetch existing shopping lists from the backend
  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/shopping-lists`);
      setShoppingLists(response.data);
    } catch (error) {
      console.error("Error fetching shopping lists:", error);
      toast.error("Failed to fetch shopping lists.");
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === '') {
      toast.error("Item cannot be empty.");
      return;
    }
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const saveShoppingList = async () => {
    if (!listName) {
      toast.error("List name is required.");
      return;
    }

    const shoppingListData = {
      name: listName,
      items,
    };

    try {
      const response = await axios.post(`${API_URL}/api/shopping-lists`, shoppingListData);
      setShoppingLists([...shoppingLists, response.data]);
      setItems([]);
      setListName('');
      toast.success("Shopping list saved successfully!");
    } catch (error) {
      console.error("Error saving shopping list:", error);
      toast.error("Failed to save shopping list.");
    }
  };

  const deleteShoppingList = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/shopping-lists/${id}`);
      setShoppingLists(shoppingLists.filter((list) => list._id !== id));
      toast.success("Shopping list deleted successfully!");
    } catch (error) {
      console.error("Error deleting shopping list:", error);
      toast.error("Failed to delete shopping list.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Shopping List</h2>
      <form onSubmit={addItem}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>

      <h3 className="mt-4">Current Items</h3>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Shopping List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <button
          className="btn btn-success"
          onClick={saveShoppingList}
          disabled={!items.length}
        >
          Save List
        </button>
      </div>

      <h3 className="mt-5">Saved Shopping Lists</h3>
      <ul className="list-group">
        {shoppingLists.map((list) => (
          <li key={list._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{list.name}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteShoppingList(list._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
