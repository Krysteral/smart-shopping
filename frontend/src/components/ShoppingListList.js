import React, { useEffect, useState } from 'react';
import { getShoppingLists, deleteShoppingList } from '../api/shoppingListApi';
import ShoppingListForm from './ShoppingListForm';

function ShoppingListList() {
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const data = await getShoppingLists();
      setShoppingLists(data);
    } catch (error) {
      console.error("Error fetching shopping lists:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteShoppingList(id);
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
            <h3>{list.name}</h3>
            <button onClick={() => handleDelete(list._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ShoppingListForm fetchShoppingLists={fetchShoppingLists} />
    </div>
  );
}

export default ShoppingListList;
