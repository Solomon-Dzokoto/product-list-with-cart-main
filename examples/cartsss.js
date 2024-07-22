const cartItemsContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const confirmOrderButton = document.getElementById("confirm-order");

// Example product data (you'll get this from your API or local data)
const products = [
  { name: "Waffle with Berries", priceCent: 550, quantity: 0 }, // Start quantities at 0
  { name: "Vanilla Bean Crème", priceCent: 700, quantity: 0 },
  // ... more products ...
];

// Function to update cart item HTML
function updateCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-items");
  cartItem.innerHTML = 
   ` <div class="first-portion">
      <p class="food-name">${product.name}</p>
      <div class="under-portion">
        <div>
          <span class="quantity">${product.quantity}x&nbsp;</span> 
          <span class="price">&nbsp;@$ ${product.priceCent / 100}</span> 
          <span class="quantity-total">&nbsp;&nbsp;$${(product.quantity * product.priceCent / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
    <img src="/assets/images/icon-remove-item.svg" alt="">`
  return cartItem;
};

// Function to update total price
function updateTotalPrice() {
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += (product.quantity * product.priceCent / 100);
  });
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Add to cart functionality
document.addEventListener("click", event => {
  if (event.target.classList.contains("button")) {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find(p => p.id === productId); // Find the product in your data
    if (product) {
      product.quantity++;
      const cartItem = updateCartItem(product);
      cartItemsContainer.appendChild(cartItem);
      updateTotalPrice();
    }
  }
});

// Clear cart for demonstration purposes (you'll need to handle removing items)
function clearCart() {
  cartItemsContainer.innerHTML = '';
  products.forEach(product => product.quantity = 0);
  updateTotalPrice();
}
clearCart(); // Clear the cart initially

// Confirm Order Logic (you'll need to handle order submission)
confirmOrderButton.addEventListener('click', () => {
  // Example: Display an alert with the order details
  let orderDetails = '';
  products.forEach(product => {
    if (product.quantity > 0) {
      orderDetails += ${product.name}: ${product.quantity}x - $${(product.quantity * product.priceCent / 100).toFixed(2)}n;
    }
  });
});