import React, { useState } from 'react';
import { createShoppingList } from '../api/shoppingListApi';

function ShoppingListForm({ fetchShoppingLists }) {
  const [listName, setListName] = useState('');
  const [items, setItems] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shoppingListData = {
      name: listName,
      items: items.split(',').map((item) => item.trim()), // Split and trim items
    };

    try {
      await createShoppingList(shoppingListData);
      fetchShoppingLists();
      setListName('');
      setItems('');
    } catch (error) {
      console.error("Error creating shopping list:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Shopping List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter items separated by commas"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        required
      />
      <button type="submit">Create Shopping List</button>
    </form>
  );
}

export default ShoppingListForm;
