import { cart } from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products-class.js'
import { formatCurrency } from './utils/money.js';

///// Handling asynchronous code using ASYNC AWAIT
async function loadProductsPage(){
  await loadProductsFetch();
  renderProductsGrid();
}

loadProductsPage();


///// Handling asynchronous code using promises and FETCH
//once the products finish loading, THEN we call renderProductsGrid()
/*
loadProductsFetch().then(() => {
  console.log(products);
  renderProductsGrid();
});
*/

///// Handling asynchronous code using promises
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderProductsGrid();
});
*/

///// Handling asynchronous code using callback functions
/*
loadProducts(renderProductsGrid);
*/

function renderProductsGrid(){
  let productsHTML = '';
  //cartModule.cart;
  
  document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity() || '';

  products.forEach((product) => {
    productsHTML += `        
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src=${product.getStarsUrl()}>
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        ${product.extraInfoHTML()}

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  let timeoutId;

  /*function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach(cartItem => {
      //cartQuantity += cartItem.productQuantity;
      cartQuantity += cartItem.quantity;

    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity;
  }*/

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      const messageElement = document.querySelector(`.js-added-to-cart-${productId}`);
      
      const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      cart.addToCart(productId, productQuantity);
      
      document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity();

      if(!messageElement.classList.contains('is-added')){
        messageElement.classList.add('is-added');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => messageElement.classList.remove('is-added'), 1500);
      }
    });
  });

}