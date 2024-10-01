const ordersUnfiltered = JSON.parse(localStorage.getItem('orders')) || [];

export const orders = ordersUnfiltered.filter(order => order.id);

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}