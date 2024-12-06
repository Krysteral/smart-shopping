const calculateCost = (shoppingList, stores) => {
    let singleStoreCost = Infinity;
    let multiStoreCost = 0;
  
    // Option 1: Cheapest single store
    stores.forEach((store) => {
      let storeTotal = 0;
      shoppingList.items.forEach((item) => {
        const product = store.inventory.find((inv) => inv.productId.toString() === item.productId.toString());
        if (product) {
          storeTotal += product.price * item.quantity;
        }
      });
      if (storeTotal < singleStoreCost) singleStoreCost = storeTotal;
    });
  
    // Option 2: Cheapest per item across multiple stores
    shoppingList.items.forEach((item) => {
      let cheapestItemCost = Infinity;
      stores.forEach((store) => {
        const product = store.inventory.find((inv) => inv.productId.toString() === item.productId.toString());
        if (product && product.price < cheapestItemCost) {
          cheapestItemCost = product.price;
        }
      });
      multiStoreCost += cheapestItemCost * item.quantity;
    });
  
    return { singleStoreCost, multiStoreCost };
  };
  
  module.exports = calculateCost;
  