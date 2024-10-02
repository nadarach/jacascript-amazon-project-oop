const ordersUnfiltered = JSON.parse(localStorage.getItem('orders')) || [];

export const orders = ordersUnfiltered.filter(order => order.id);

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){
  let matchingOrder = orders.find((order) => order.id === orderId);

  if(!matchingOrder) {
    return;
  }

  return matchingOrder;
}

export function getProductQuantity(orderId, productId) {
  let matchingOrder = getOrder(orderId);

  let matchingProduct = matchingOrder.products.find(product => product.productId === productId);
  
  if(!matchingProduct){
    return;
  }

  return matchingProduct.quantity;
}