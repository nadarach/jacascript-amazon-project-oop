import {orders, getProductQuantity} from '../data/orders.js'
import { getProduct, loadProductsFetch } from '../data/products-class.js';
import {loadCartFetch, cart} from '../data/cart-class.js'
import { formatCurrency } from './utils/money.js';
import { formatDate } from './utils/time.js';
import { renderOrderProductSummary } from './orders/orderProductsSummary.js';

await loadProductsFetch();
await loadCartFetch();
//renderCheckoutHeader();

console.log(orders);

let ordersSummaryHTML = '';
orders.forEach(order => {
  ordersSummaryHTML += 
  `<div class="order-container js-order-container-${order.id}">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formatDate(order.orderTime)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">${renderOrderProductSummary(order)}</div>
    </div>`;
});

document.querySelector('.js-orders-grid').innerHTML = ordersSummaryHTML;

document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity() || '';

document.querySelectorAll('.js-buy-again-button').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const orderId = link.dataset.orderId;
    const productQuantity = getProductQuantity(orderId, productId);

    //cart.addToCart(productId, productQuantity);
    cart.addToCart(productId, 1);
    document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity() || '';

  });
});

