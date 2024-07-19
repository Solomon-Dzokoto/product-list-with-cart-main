const product = [
  {
      id: 111,
      image: './assets/images/image-waffle-desktop.jpg',
      category: 'Waffle',
      name: 'Waffle with Berries',
      priceCent: 660
  },
  // ... (rest of your product data)
];

let productHTML = '';
product.forEach((product) => {
  productHTML += `
      <div class="products-container" data-category="${product.category}">
          <div class="thumbnails">
              <img class="js-food-image" data-image="${product.image}" src="${product.image}" alt="${product.name}">
              <button class="button add-to-cart" data-product-id="${product.id}" data-name="${product.name}" data-image="${product.image}" data-price="${product.priceCent}">
                  <img class="minus" src="./assets/images/icon-decrement-quantity.svg" alt="minus">
                  <span class="quantity">0</span>
                  <img class="plus" src="./assets/images/icon-increment-quantity.svg" alt="plus">
                  <span class="add-to-cart">Add to Cart</span>
              </button>
          </div>
          <span>${product.category}product</span>
          <p class="food-name">${product.name}</p>
          <small id="price">$${(product.priceCent / 100).toFixed(2)}</small>
      </div>
      `
  ;
});

document.querySelector('.products-container').innerHTML = productHTML;

const buttons = document.querySelectorAll('.button');
const images = document.querySelectorAll('.js-food-image');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCartTotal() {
  let total = 0;
  for (const itemId in cart) {
      total += cart[itemId].quantity * (cart[itemId].price / 100);
  }
  cartTotal.textContent = Total: $${total.toFixed(2)};
  localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCartItems() {
  cartItemsContainer.innerHTML = ''; // Clear the container
  for (const itemId in cart) {
      const item = cart[itemId];

      // Create the elements dynamically
      const cartItem = document.createElement('div'); 
      cartItem.classList.add('cart-item');
      cartItem.dataset.productId = itemId;

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.name;

      const quantity = document.createElement('span');
      quantity.classList.add('quantity');
      quantity.textContent = item.quantity;

      const price = document.createElement('span');
      price.classList.add('price');
      price.textContent = $${(item.price / 100).toFixed(2)};

      const removeSpan = document.createElement('span');
      removeSpan.classList.add('remove');
      const removeImg = document.createElement('img');
      removeImg.src = './assets/images/icon-remove.svg';
      removeImg.alt = 'Remove';
      removeSpan.appendChild(removeImg);

      // Append elements to the cart item
      cartItem.appendChild(image);
      cartItem.appendChild(quantity);
      cartItem.appendChild(price);
      cartItem.appendChild(removeSpan);

      // Add the cart item to the container
      cartItemsContainer.appendChild(cartItem);
  }
  updateCartTotal();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        // Toggle the border color on matching images
        images.forEach(image => {
            if (image.dataset.category === category) {
                image.classList.toggle('selected');
            }
        });
    });
});

// Handle add to cart button clicks
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (event) => {
        const target = event.target;
        const productId = button.dataset.productId;
        const productName = button.dataset.name;
        const productImage = button.dataset.image;
        const productPrice = button.dataset.price;
        const quantitySpan = button.querySelector('.quantity');
        const addToCartSpan = button.querySelector('.add-to-cart');
        const minusIcon = button.querySelector('.minus');
        const plusIcon = button.querySelector('.plus');

        if (target === addToCartSpan || target === plusIcon) {
            if (!(productId in cart)) {
                cart[productId] = {
                    id: productId,
                    name: productName,
                    image: productImage,
                    price: productPrice,
                    quantity: 1
                };
            } else {
                cart[productId].quantity++;
            }
            quantitySpan.textContent = cart[productId].quantity;
            addToCartSpan.style.display = 'none';
            minusIcon.style.display = 'inline-block';
            plusIcon.style.display = 'inline-block';
            displayCartItems();
        } else if (target === minusIcon) {
            if (cart[productId].quantity > 1) {
                cart[productId].quantity--;
            } else {
                delete cart[productId];
            }
            quantitySpan.textContent = cart[productId].quantity || 0;
            if (cart[productId].quantity === 0) {
                addToCartSpan.style.display = 'inline-block';
                minusIcon.style.display = 'none';
                plusIcon.style.display = 'none';
            }

            
            displayCartItems();
        }
    });
});
console.log(cart[productId].quantity)
// Handle remove from cart
cartItemsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('remove')) {
        const cartItem = target.closest('.cart-item');
        const productId = cartItem.dataset.productId;
        delete cart[productId];
        displayCartItems();
    }
});

const products = [
  { name: "Waffle with Berries", price: 5.50 },
  { name: "Vanilla Bean Crème", price: 7.00 },
  // ... more products ...
];

const cartItemsContainer = document.querySelector(".pop-up");

function createCartItems(products) {
  const fragment = document.createDocumentFragment(); // Use a DOM fragment for efficiency

  products.forEach(product => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-items");
    cartItem.innerHTML = 
      <div class="first-portion">
        <p class="food-name">${product.name}</p>
        <div class="under-portion">
          <div>
            <span class="quantity">1x&nbsp;</span> 
            <span class="price">&nbsp;@$ ${product.price.toFixed(2)}</span> 
            <span class="quantity-total">&nbsp;&nbsp;$${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <img src="./assets/images/icon-remove-item.svg" alt="">
    ;
    fragment.appendChild(cartItem); 
  });
  cartItemsContainer.appendChild(fragment); 
}

// Make sure you only call this function once!
createCartItems(products); 