import {orders} from '../data/orders.js'
import { getProduct, loadProductsFetch } from '../data/products-class.js';
import { formatCurrency } from './utils/money.js';
import { formatDate } from './utils/time.js';


await loadProductsFetch();

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

function renderOrderProductSummary(order){
  let orderProductsHTML = '';
  order.products.forEach(product => {
    const productId = product.productId;
    const matchingProduct = getProduct(productId);
    
    orderProductsHTML += `
        <div class="product-image-container 
      js-product-image-container-${order.id}">
          <img src=${matchingProduct.image}>
        </div>

        <div class="product-details 
        js-product-details-${order.id}">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(product.estimatedDeliveryTime)}
          </div>

          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          
          <button class="buy-again-button
          js-buy-again-${productId} button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button
            js-track-package-${productId} button-secondary">
              Track package
            </button>
          </a>
        </div>
    `;
  });

  return orderProductsHTML;
}