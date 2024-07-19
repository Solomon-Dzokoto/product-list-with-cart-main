const productList = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const confirmOrderButton = document.getElementById("confirm-order");
const cartButton = document.getElementById("cart-button");
const cartBox = document.getElementById("cart-box");

// Sample product data (you'll get this from your API or local storage)
const products = [
  { id: 1, name: "Waffle with Berries", category: "Breakfast", priceCent: 550, image: "./assets/images/image-product-1-thumbnail.jpg" , quantity: 0 }, 
  { id: 2, name: "Vanilla Bean Crème", category: "Desserts", priceCent: 700, image: "./assets/images/image-product-2-thumbnail.jpg", quantity: 0 },
  { id: 3, name: "Macaron Mix of Five", category: "Desserts", priceCent: 800, image: "./assets/images/image-product-3-thumbnail.jpg", quantity: 0 },
  { id: 4, name: "Classic Tiramisu", category: "Desserts", priceCent: 550, image: "./assets/images/image-product-4-thumbnail.jpg", quantity: 0 },
  { id: 5, name: "Pistachio Baklava", category: "Desserts", priceCent: 400, image: "./assets/images/image-product-5-thumbnail.jpg", quantity: 0 },
  { id: 6, name: "Lemon Meringue Pie", category: "Desserts", priceCent: 450, image: "./assets/images/image-product-6-thumbnail.jpg", quantity: 0 },
  { id: 7, name: "Red Velvet Cake", category: "Desserts", priceCent: 550, image: "./assets/images/image-product-7-thumbnail.jpg", quantity: 0 },
  { id: 8, name: "Salted Caramel Brownie", category: "Desserts", priceCent: 450, image: "./assets/images/image-product-8-thumbnail.jpg", quantity: 0 },
  { id: 9, name: "Vanilla Panna Cotta", category: "Desserts", priceCent: 650, image: "./assets/images/image-product-9-thumbnail.jpg", quantity: 0 },
];


// Function to display products
function displayProducts() {
  productList.innerHTML = ''; // Clear previous products

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('products-container');
    productElement.dataset.category = product.category; // Add category data
    productElement.innerHTML = 
      `<div class="thumbnails">
        <img class="js-food-image" data-image="${product.image}" src="${product.image}" alt="${product.name}">
        <button class="button" data-product-id="${product.id}" data-name="${product.name}"                 data-image="${product.image}" data-price="${product.priceCent}">
          <img src="./assets/images/icon-decrement-quantity.svg" alt="minus">
          <img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart
          <img class="plus" src="./assets/images/icon-increment-quantity.svg" alt="plus">
        </button>
      </div>
      <span>${product.category}product</span>
      <p class="food-name">${product.name}</p>
      <small id="price">$${(product.priceCent / 100).toFixed(2)}</small>`
    ;

    // Event listener for Add to Cart button
    productElement.querySelector('.button').addEventListener('click', (event) => {
      addToCart(event.target);
    });

    productList.appendChild(productElement);
  });
}

// Function to update cart item HTML
function updateCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-items");
  cartItem.innerHTML = 
    `<div class="first-portion">
      <p class="food-name">${product.name}</p>
      <div class="under-portion">
        <div>
          <span class="quantity">${product.quantity}x&nbsp;</span> 
          <span class="price">&nbsp;@$ ${product.priceCent / 100}</span> 
          <span class="quantity-total">&nbsp;&nbsp;$${(product.quantity * product.priceCent / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
    <img src="./assets/images/icon-remove-item.svg" alt="">`
  ;
  return cartItem;
}

// Function to update total price
function updateTotalPrice() {
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += (product.quantity * product.priceCent / 100);
  });
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Add to Cart functionality
function addToCart(button) {
  const productId = parseInt(button.dataset.productId);
  const product = products.find(p => p.id === productId);
  if (product) {
    product.quantity++;
    const cartItem = updateCartItem(product);
    cartItemsContainer.appendChild(cartItem);
    updateTotalPrice();
  }
}

// Clear cart for demonstration purposes (you'll need to handle removing items)
function clearCart() {
  cartItemsContainer.innerHTML = '';
  products.forEach(product => product.quantity = 0);
  updateTotalPrice();
}

// Confirm Order Logic (you'll need to handle order submission)
confirmOrderButton.addEventListener('click', () => {
  let orderDetails = '';
  products.forEach(product => {
    if (product.quantity > 0) {
      orderDetails += ${product.name}: ${product.quantity}x - $${(product.quantity * product.priceCent / 100).toFixed(2)}\n;
    }
  });
  alert("Your Order:\n" + orderDetails + "\nTotal: $" + totalPriceElement.textContent);
  // Here, you'd normally send the order data to your server for processing
});

// Initial display of products and hiding cart
displayProducts();
cartBox.style.display = "none"; // Hide cart initially

// Event listener for cart button
cartButton.addEventListener('click', () => {
  cartBox.style.display = "block"; // Show cart
  updateTotalPrice();
});