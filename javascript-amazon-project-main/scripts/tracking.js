import { getOrder, getOrderProduct } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products-class.js";
import { formatDate } from "./utils/time.js";

await loadProductsFetch();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const order = getOrder(orderId);
const product = getProduct(productId);

const productDetails = getOrderProduct(orderId, productId);

const orderTimeString = formatDate(order.orderTime);
const deliveryTimeString = formatDate(productDetails.estimatedDeliveryTime);

console.log(product, order, productDetails);

let trackingHTML = '';

trackingHTML = `        
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>

  <div class="delivery-date">
    Arriving on ${deliveryTimeString}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${productDetails.quantity}
  </div>

  <img class="product-image" src=${product.image}>

  <div class="progress-labels-container">
    <div class="progress-label">
      Preparing
    </div>
    <div class="progress-label current-status">
      Shipped
    </div>
    <div class="progress-label">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar"></div>
  </div>`;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;