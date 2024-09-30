import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {cart} from '../data/cart-class.js';
import { loadCart } from "../data/cart-class.js";
import { loadProducts } from "../data/products-class.js";


///// Handling asynchronous code using callback functions
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});





