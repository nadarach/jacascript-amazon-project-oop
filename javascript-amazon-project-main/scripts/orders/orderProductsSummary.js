import { getProduct } from '../../data/products-class.js';
import { formatDate } from '../utils/time.js';

//This is for rendering the products of a single order in the orders page
export function renderOrderProductSummary(order){
  let orderProductsHTML = '';
  order.products.forEach(product => {
    const productId = product.productId;
    const orderId= order.id;
    const matchingProduct = getProduct(productId);
    
    orderProductsHTML += `
        <div class="product-image-container 
          js-product-image-container-${orderId}">
          <img src=${matchingProduct.image}>
        </div>

        <div class="product-details 
          js-product-details-${orderId}">
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
            js-buy-again-button
          js-buy-again-${productId} button-primary" data-order-id=${orderId} data-product-id=${productId}>
          <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productId}">
            <button class="track-package-button
            js-track-package
            js-track-package-${productId} button-secondary" data-order-id=${orderId} data-product-id=${productId}>
              Track package
            </button>
          </a>
        </div>
    `;
  });

  return orderProductsHTML;
}