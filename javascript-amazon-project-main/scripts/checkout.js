import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {cart} from '../data/cart-class.js';
import { loadCart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products-class.js";

///// Handling asynchronous code using ASYNC AWAIT
async function loadCheckoutPage(){

  try {
    // throw 'error1';
    
    await loadProductsFetch();

    //two (2) ways to create an error inside a promise
    const value = await new Promise((resolve, reject) => {
      // throw 'error2'; //to create the error synchronously (right away)
      loadCart(() => {
        // reject('error3'); //to create the error asyncrhonously (in the future)
        resolve();
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

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




