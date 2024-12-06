import React, { useState } from 'react';
import { comparePrices } from '../api/storeApi'; // Placeholder API method

function PriceComparison() {
  const [shoppingListId, setShoppingListId] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleComparePrices = async () => {
    try {
      const data = await comparePrices(shoppingListId); // Fetch comparison data
      setComparisonResult(data);
    } catch (error) {
      console.error("Error comparing prices:", error);
    }
  };

  return (
    <div>
      <h2>Compare Prices</h2>
      <input
        type="text"
        placeholder="Enter Shopping List ID"
        value={shoppingListId}
        onChange={(e) => setShoppingListId(e.target.value)}
        required
      />
      <button onClick={handleComparePrices}>Compare Prices</button>
      {comparisonResult && (
        <div>
          <h3>Comparison Results</h3>
          <ul>
            <li>Cheapest Store: {comparisonResult.cheapestStore.name}</li>
            <li>Total Cost: ${comparisonResult.cheapestStore.total}</li>
            <li>
              Optimized Path: {comparisonResult.optimizedPath.map((store) => store.name).join(' → ')}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PriceComparison;
