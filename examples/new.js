const products = [
  { id: 111,
     name: "Waffle with Berries",
      category: "Breakfast",
       priceCent: 550,
        image: "./assets/images/image-waffle-desktop.jpg",
         quantity: 0
         }, 
  { id: 222,
     name: "Vanilla Bean Crème", 
     category: "Bean Crème",
      priceCent: 700, 
      image: "./assets/images/image-creme-brulee-desktop.jpg",
       quantity: 0 
      },
  { id: 333,
     name: "Macaron Mix of Five", 
     category: "Macaron",
      priceCent: 800,
       image: "./assets/images/image-macaron-desktop.jpg", 
       quantity: 0
       },
  { id: 444,
     name: "Classic Tiramisu",
      category: "Tiramisu", 
     priceCent: 550,
      image: "./assets/images/image-tiramisu-desktop.jpg", quantity: 0
     },
  { id: 555,
     name: "Pistachio Baklava", 
     category: "Baklava",
      priceCent: 400, 
      image: "./assets/images/image-baklava-desktop.jpg" , quantity: 0 
    },
  { id: 666,
     name: "Lemon Meringue Pie", 
     category: "Pie",
      priceCent: 450,
       image:"./assets/images/image-meringue-desktop.jpg", quantity: 0
       },
  { id: 777, 
    name: "Red Velvet Cake", 
    category: "cake",
     priceCent: 550, 
     image: "./assets/images/image-cake-desktop.jpg" , quantity: 0
     },
  { id: 888,
     name: "Salted Caramel Brownie", 
     category: "Brownie",
      priceCent: 450,
       image: "./assets/images/image-brownie-desktop.jpg",
        quantity: 0
       },
  { id: 999,
     name: "Vanilla Panna Cotta",
      category: "anna Cotta", 
      priceCent: 650,
       image: "./assets/images/image-panna-cotta-desktop.jpg",
        quantity: 0 },
];
 // ... (your product array 'products' is already defined)

let productsHTML = '';

products.forEach((product) => {
  productsHTML += 
                `
             <div id="${product.id}" class="products-container">
             <div class="thumbnails">
              <img class="img" id="image1" src=${product.image} alt="">
             <button class="button js-add-to-cart" data-product-id="${product.id}" >
              <i class="fa-solid fa-minus js-minus-button" data-product-id="${product.id}"></i>
              <div class="cart-image">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
               </div>
              <span class="display-quantity" data-product-id="${product.id}">0</span>
              <p class="add">
              Add to Cart
              </p>
              <i class="fa-solid fa-plus js-plus-button" data-product-id="${product.id}"></i>
            </button>
            </div>
            <span>Waffle</span>
            <p class="food-name">${product.name}</p>
            <small  class="price">$${(product.priceCent/100).toFixed(2)}</small>
          </div>
  `
});
document.querySelector('.js-main-container').innerHTML = productsHTML;

const buttons = document.querySelectorAll('.js-add-to-cart');
const minusButtons = document.querySelectorAll('.js-minus-button');
const plusButtons = document.querySelectorAll('.js-plus-button');
const quantityDisplays = document.querySelectorAll('.display-quantity'); 
let displayQuantity = document.querySelector('.display-quantity');

// Initialize the cart as an empty array
let cart = [];

function calculateCartTotal() {
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += (item.priceCent / 100) * item.quantity; // Calculate total based on quantity
  });
  return totalPrice;
}

function updateTotalPrice() {
  const totalPrice = calculateCartTotal();
  // Assuming you have an element with id "totalPrice" to display the total
  document.getElementById('totalPrice').textContent = "$" + totalPrice.toFixed(2); 
}

// Handle Add to Cart Click
buttons.forEach((button) => {  button.addEventListener('click', () => {
  const productContainer = button.parentNode;
  const imageElement = productContainer.querySelector('.img');
  imageElement.style.border = "2px solid #c73a0f";
  button.style.color = "white";
  button.style.backgroundColor = "#c73a0f";
  button.style.width = "65%";
  button.style.display = "flex";
  button.style.gap = "3rem";

  const productId = parseInt(button.dataset.productId);
  const productIndex = products.findIndex(product => product.id === productId);
  const product = products[productIndex];

  // Update the quantity of the product in the products array
  product.quantity++;

  // Check if the item is already in the cart, if not, add it
  const isItemInCart = cart.some(item => item.id === productId);
  if (!isItemInCart) {
    cart.push(product);
  }

  // Update the display quantity for the product
  const quantityDisplay = productContainer.querySelector('.display-quantity');
  quantityDisplay.textContent = product.quantity;

  // Update the total price
  updateTotalPrice();
});
});

// Handle Minus Button Click
minusButtons.forEach(button => {
button.addEventListener('click', () => {
  const productId = parseInt(button.dataset.productId);
  const productIndex = products.findIndex(product => product.id === productId);
  const product = products[productIndex];

  if (product.quantity > 0) {
    product.quantity--;

    // Update display quantity
    const quantityDisplay = productContainer.querySelector('.display-quantity');
    quantityDisplay.textContent = product.quantity;

    // Update the cart if the quantity is 0
    if (product.quantity === 0) {
      const cartIndex = cart.findIndex(item => item.id === productId);
      if (cartIndex !== -1) {
        cart.splice(cartIndex, 1); // Remove from cart if quantity is 0
      }
    }

    // Update the total price
    updateTotalPrice();
  }
});
});

// Handle Plus Button Click
plusButtons.forEach(button => {
button.addEventListener('click', () => {
  const productId = parseInt(button.dataset.productId);
  const productIndex = products.findIndex(product => product.id === productId);
  const product = products[productIndex];

  product.quantity++;

  // Update display quantity
  const quantityDisplay = productContainer.querySelector('.display-quantity');
  quantityDisplay.textContent = product.quantity;

  // Update the cart if the quantity is 0
  const cartIndex = cart.findIndex(item => item.id === productId);
  if (cartIndex === -1) {
    cart.push(product); // Add to cart if not already present
  }

  // Update the total price
  updateTotalPrice(); 
});
});