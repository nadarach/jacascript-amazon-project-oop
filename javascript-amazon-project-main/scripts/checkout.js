import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {cart} from '../data/cart-class.js';
import { loadCart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products-class.js";

///// Handling asynchronous code using ASYNC AWAIT
async function loadCheckoutPage(){
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadCheckoutPage();

///// Handling asynchronous code using promises and FETCH
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/


///// Handling asynchronous code using promises and Promise.all
/*
Promise.all([
  new Promise(resolve => {
    loadProducts(() => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

///// Handling asynchronous code using promises
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise(resolve => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/


///// Handling asynchronous code using callback functions
/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/




