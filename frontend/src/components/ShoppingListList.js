import React, { useEffect, useState } from 'react';
import { getShoppingLists } from '../api/shoppingListApi'; // Assume an API file for shopping list functions

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

  return (
    <div>
      <h2>Shopping Lisat Lists</h2>
      <ul>
        {shoppingLists.map((list) => (
          <li key={list._id}>
            <h3>{list.name}</h3>
            <ul>
              {list.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListList;