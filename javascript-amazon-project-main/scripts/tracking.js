import { getOrder, getOrderProduct } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products-class.js";
import { formatDate } from "./utils/time.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' //default export



await loadProductsFetch();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const order = getOrder(orderId);
const product = getProduct(productId);

const productDetails = getOrderProduct(orderId, productId);

const orderTime = dayjs(order.orderTime);
const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

const currentTime = dayjs();


const progressPercent = Math.round(((currentTime.diff(dayjs(orderTime)) ) / (dayjs(deliveryTime).diff(orderTime))) * 100);

let trackingHTML = '';

trackingHTML = `        
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>

  <div class="delivery-date">
    Arriving on ${formatDate(deliveryTime)}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${productDetails.quantity}
  </div>

  <img class="product-image" src=${product.image}>

  <div class="progress-labels-container">
    <div class="progress-label 
      ${(progressPercent > 0 && progressPercent <= 49)? 'current-status': ''}">
      Preparing
    </div>
    <div class="progress-label
      ${(progressPercent > 50 && progressPercent <= 99)? 'current-status': ''}">
      Shipped
    </div>
    <div class="progress-label
      ${(progressPercent >= 100)? 'current-status': ''}">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width:${progressPercent}%"></div>
  </div>`;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

