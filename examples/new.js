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

// Cart array to hold added items
let cart = [];

// Function to update the cart display
function addCartToHTML() {
  const cartItems = document.getElementById('cart-items-container'); 
  cartItems.innerHTML = ''; 
  if (cart.length > 0) {
    cart.forEach(cartItem => {
      let newCart = document.createElement('div');
      newCart.classList.add('cartItem');
      newCart.innerHTML = 
      `
        <div class="cart-item" data-product-id="${cartItem.id}"> 
          <p class="food-name">${cartItem.name}</p>
          <span class="price">@$${(cartItem.priceCent / 100).toFixed(2)}</span>
          <span class="quantity">${cartItem.quantity}</span>
          <span class="price-total">(${(cartItem.quantity * (cartItem.priceCent / 100)).toFixed(2)})</span>
          <i class="fa-solid fa-xmark" style="color: #826830;" data-product-id="${cartItem.id}"></i> 
        </div>
      `;
      cartItems.appendChild(newCart);
    });
  }
}

let productsHTML = '';

products.forEach((product) => {
  productsHTML += 
   `
    <div id="${product.id}" class="products-container">
            <div class="thumbnails">
              <img class="img" id="image1" src=${product.image} alt="">
             <button class="button js-add-to-cart" data-product-id="${product.id}">
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

// Handle Add to Cart Click
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const productContainer = button.parentNode;
    const imageElement = productContainer.querySelector('.img');
    imageElement.style.border = "2px solid #c73a0f";
    button.style.color = "white";
    button.style.backgroundColor = "#c73a0f";
    button.style.width = "65%";
    button.style.display = "flex";
    button.style.gap = "3rem";

    const productId = parseInt(button.dataset.productId); 
    const quantityDisplay = button.querySelector('.display-quantity'); 
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex === -1) { // Product is not in the cart
      // Find product in the products array
      const product = products.find(item => item.id === productId);
      // Add product to the cart array
      cart.push({ ...product, quantity: 1 });
    } else { // Product is already in the cart
      // Increase the quantity
      cart[productIndex].quantity++;
    }

    // Update the quantity display
    quantityDisplay.textContent = cart[productIndex].quantity;

    // Update the cart display (call the function to update the HTML)
    addCartToHTML();
  });
});

// Handle Minus Button Click
minusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.productId);
    const quantityDisplay = button.parentNode.querySelector('.display-quantity');

    // Find the product in the cart
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) { // Product is in the cart
      if (cart[productIndex].quantity > 1) {
        // Decrease the quantity
        cart[productIndex].quantity--;
      } else {
        // Remove the product from the cart
        cart.splice(productIndex, 1);
      }

      // Update the quantity display
      quantityDisplay.textContent = cart[productIndex] ? cart[productIndex].quantity : 0;

      // Update the cart display
      addCartToHTML();
    }
  });
});

// Handle Plus Button Click
plusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.productId);
    const quantityDisplay = button.parentNode.querySelector('.display-quantity');

    // Find the product in the cart
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) { // Product is in the cart
      // Increase the quantity
      cart[productIndex].quantity++;

      // Update the quantity display
      quantityDisplay.textContent = cart[productIndex].quantity;

      // Update the cart display
      addCartToHTML();
    }
  });
});