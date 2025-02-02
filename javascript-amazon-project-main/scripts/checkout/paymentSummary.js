import {cart} from '../../data/cart-class.js'
//import {loadCartFetch} from '../../data/cart-class.js'
import { getDeliveryOption } from '../../data/deliveryOptions-class.js';
import { orders, addOrder } from '../../data/orders.js';
import { getProduct } from '../../data/products-class.js';
import { formatCurrency } from '../utils/money.js';
import {loadCheckoutPage} from '../checkout.js'

export function renderPaymentSummary(){

  let productPriceCents = 0;
  let deliveryPriceCents = 0;

  cart.cartItems.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    deliveryPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.updateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(deliveryPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button js-place-order button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
  .addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addOrder(order);
    } 
    catch (error) {
      console.log('Unexpected error. Try again later.');
    }
    
    cart.cartItems = [];
    cart.saveToStorage();

    await loadCheckoutPage();
    //changing the href property changes the URL at the top of the browser
    //window.location.href = 'orders.html';
    console.log(orders);

  });
}
