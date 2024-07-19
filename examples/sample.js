const buttons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');

// Function to add a product to the cart
function addToCart(productId) {
  const productElement = document.querySelector([data-product-id="${productId}"]).closest('.product');
  const productName = productElement.dataset.productName;
  const productPrice = productElement.dataset.productPrice;
  const productImageId = productElement.dataset.imageId;

  // Check if the product is already in the cart
  let existingCartItem = cartItems.querySelector([data-product-id="${productId}"]);

  if (existingCartItem) {
    // If the product exists, update the quantity
    let quantity = parseInt(existingCartItem.querySelector('.quantity').textContent);
    quantity++;
    existingCartItem.querySelector('.quantity').textContent = quantity;
    existingCartItem.querySelector('.total').textContent = (quantity * parseFloat(productPrice)).toFixed(2);
  } else {
    // If the product is new, add it to the cart
    const newRow = cartItems.insertRow();
    newRow.dataset.productId = productId;
    newRow.innerHTML = 
      <td>
        <img src="${document.getElementById(productImageId).src}" alt="${productName}">
        <p>${productName}</p>
      </td>
      <td>$${productPrice}</td>
      <td class="quantity">1</td>
      <td class="total">$${productPrice}</td>
      <td>
        <button class="remove-item" data-product-id="${productId}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path stroke="#747474" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 3h14m-14 8h14M1 11h14" />
          </svg>
        </button>
      </td>
    ;
  }
  updateCartTotal();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  const cartItem = cartItems.querySelector([data-product-id="${productId}"]);
  if (cartItem) {
    cartItems.removeChild(cartItem);
    updateCartTotal();
  }
}

// Function to update the cart total
function updateCartTotal() {
  let subtotal = 0;
  const totalElements = cartItems.querySelectorAll('.total');
  totalElements.forEach(totalElement => {
    subtotal += parseFloat(totalElement.textContent.replace('$', ''));
  });
  cartSubtotal.textContent = '$' + subtotal.toFixed(2);
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);

    // Change button text and add quantity
    const quantity = parseInt(button.querySelector('.quantity').textContent || 0) + 1;
    button.querySelector('.quantity').textContent = quantity;
    button.querySelector('.add-to-cart-text').style.display = 'none'; 
    button.querySelector('.quantity').style.display = 'inline-block';
    button.querySelector('.remove-item').style.display = 'inline-block';

    // Add storage logic here if needed (see notes below)
  });
});

// Add event listeners to remove buttons
cartItems.addEventListener('click', event => {
  if (event.target.classList.contains('remove-item')) {
    const productId = event.target.dataset.productId;
    removeFromCart(productId);

    // Update button text and quantity
    const button = document.querySelector([data-product-id="${productId}"]);
    button.querySelector('.add-to-cart-text').style.display = 'inline-block'; 
    button.querySelector('.quantity').style.display = 'none';
    button.querySelector('.remove-item').style.display = 'none';
    button.querySelector('.quantity').textContent = '1'; // Reset quantity
    
    // Add storage logic here if needed (see notes below)
  }
});

// Initialize cart from local storage
// ... (See notes below)